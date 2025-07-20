import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertVideoSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lead submission endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.json({ success: true, lead });
    } catch (error) {
      console.error("Error creating lead:", error);
      res.status(400).json({ 
        success: false, 
        error: "Dados inválidos. Verifique as informações e tente novamente." 
      });
    }
  });

  // Get all leads (for admin purposes)
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  // Video routes
  app.get("/api/videos", async (req, res) => {
    try {
      const videos = await storage.getVideos();
      res.json(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  app.get("/api/videos/section/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const video = await storage.getVideoBySection(section);
      if (!video) {
        return res.status(404).json({ error: "Video not found for this section" });
      }
      res.json(video);
    } catch (error) {
      console.error("Error fetching video by section:", error);
      res.status(500).json({ error: "Failed to fetch video" });
    }
  });

  app.post("/api/videos", async (req, res) => {
    try {
      const validatedData = insertVideoSchema.parse(req.body);
      const video = await storage.createVideo(validatedData);
      res.json({ success: true, video });
    } catch (error) {
      console.error("Error creating video:", error);
      res.status(400).json({ 
        success: false, 
        error: "Dados inválidos para vídeo. Verifique as informações e tente novamente." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

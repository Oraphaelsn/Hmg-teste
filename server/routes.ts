import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertVideoSchema, insertWhatsappConfigSchema } from "@shared/schema";
import { sendLeadNotification, setupWhatsAppIntegration } from "./whatsapp";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lead submission endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      
      // Enviar notificação WhatsApp em background (não bloquear a resposta)
      setImmediate(async () => {
        try {
          await sendLeadNotification(lead.id.toString(), lead);
        } catch (error) {
          console.error("Erro ao enviar notificação WhatsApp:", error);
        }
      });
      
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

  // WhatsApp Configuration routes
  app.post("/api/whatsapp/config", async (req, res) => {
    try {
      const validatedData = insertWhatsappConfigSchema.parse(req.body);
      const config = await storage.createWhatsappConfig(validatedData);
      res.json({ success: true, config });
    } catch (error) {
      console.error("Error creating WhatsApp config:", error);
      res.status(400).json({ 
        success: false, 
        error: "Dados inválidos para configuração WhatsApp. Verifique as informações e tente novamente." 
      });
    }
  });

  app.get("/api/whatsapp/config", async (req, res) => {
    try {
      const config = await storage.getActiveWhatsappConfig();
      if (!config) {
        return res.status(404).json({ error: "Nenhuma configuração WhatsApp ativa encontrada" });
      }
      // Remove o token da resposta por segurança
      const safeConfig = { ...config, apiToken: '***hidden***' };
      res.json(safeConfig);
    } catch (error) {
      console.error("Error fetching WhatsApp config:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  app.put("/api/whatsapp/config/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const config = await storage.updateWhatsappConfig(parseInt(id), updates);
      if (!config) {
        return res.status(404).json({ error: "Configuração WhatsApp não encontrada" });
      }
      res.json({ success: true, config });
    } catch (error) {
      console.error("Error updating WhatsApp config:", error);
      res.status(400).json({ 
        success: false, 
        error: "Erro ao atualizar configuração WhatsApp" 
      });
    }
  });

  // WhatsApp Logs routes
  app.get("/api/whatsapp/logs", async (req, res) => {
    try {
      const logs = await storage.getWhatsappLogs();
      res.json(logs);
    } catch (error) {
      console.error("Error fetching WhatsApp logs:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  app.get("/api/whatsapp/logs/lead/:leadId", async (req, res) => {
    try {
      const { leadId } = req.params;
      const logs = await storage.getWhatsappLogsByLead(leadId);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching WhatsApp logs by lead:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  // Setup endpoint for easy WhatsApp configuration
  app.post("/api/whatsapp/setup", async (req, res) => {
    try {
      const config = await setupWhatsAppIntegration(req.body);
      res.json({ success: true, config: { ...config, apiToken: '***hidden***' } });
    } catch (error) {
      console.error("Error setting up WhatsApp integration:", error);
      res.status(400).json({ 
        success: false, 
        error: "Erro ao configurar integração WhatsApp" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

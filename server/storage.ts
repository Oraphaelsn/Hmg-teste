import { leads, videos, type Lead, type InsertLead, type Video, type InsertVideo } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { neon } from "@neondatabase/serverless";
import { desc, eq } from "drizzle-orm";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  createVideo(video: InsertVideo): Promise<Video>;
  getVideos(): Promise<Video[]>;
  getVideoBySection(section: string): Promise<Video | undefined>;
}

export class SupabaseStorage implements IStorage {
  private sql;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is required for Supabase storage");
    }
    this.sql = neon(process.env.DATABASE_URL);
    this.initializeDatabase();
  }

  private async initializeDatabase() {
    try {
      // Create the leads table if it doesn't exist
      await this.sql(`
        CREATE TABLE IF NOT EXISTS leads (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          treatment TEXT,
          insurance TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
      
      // Create the videos table if it doesn't exist
      await this.sql(`
        CREATE TABLE IF NOT EXISTS videos (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          filename TEXT NOT NULL,
          section TEXT NOT NULL,
          is_active TEXT DEFAULT 'true' NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
      console.log("✅ Database initialized successfully");
    } catch (error: unknown) {
      console.error("⚠️ Error initializing database:", (error as Error).message);
    }
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    try {
      const [lead] = await this.sql(`
        INSERT INTO leads (name, phone, treatment, insurance, created_at)
        VALUES ($1, $2, $3, $4, NOW())
        RETURNING id, name, phone, treatment, insurance, created_at
      `, [
        insertLead.name,
        insertLead.phone,
        insertLead.treatment || null,
        insertLead.insurance || null,
      ]);
      
      return {
        id: lead.id,
        name: lead.name,
        phone: lead.phone,
        treatment: lead.treatment,
        insurance: lead.insurance,
        createdAt: new Date(lead.created_at),
      };
    } catch (error) {
      console.error("Error creating lead in Supabase:", error);
      throw error;
    }
  }

  async getLeads(): Promise<Lead[]> {
    try {
      const allLeads = await this.sql(`
        SELECT id, name, phone, treatment, insurance, created_at
        FROM leads
        ORDER BY created_at DESC
      `);
      
      return allLeads.map((lead: any) => ({
        id: lead.id,
        name: lead.name,
        phone: lead.phone,
        treatment: lead.treatment,
        insurance: lead.insurance,
        createdAt: new Date(lead.created_at),
      }));
    } catch (error: unknown) {
      console.error("Error fetching leads from Supabase:", error);
      throw error;
    }
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    try {
      const [video] = await this.sql(`
        INSERT INTO videos (title, description, filename, section, is_active, created_at)
        VALUES ($1, $2, $3, $4, $5, NOW())
        RETURNING id, title, description, filename, section, is_active, created_at
      `, [
        insertVideo.title,
        insertVideo.description || null,
        insertVideo.filename,
        insertVideo.section,
        insertVideo.isActive || 'true',
      ]);
      
      return {
        id: video.id,
        title: video.title,
        description: video.description,
        filename: video.filename,
        section: video.section,
        isActive: video.is_active,
        createdAt: new Date(video.created_at),
      };
    } catch (error: unknown) {
      console.error("Error creating video in Supabase:", error);
      throw error;
    }
  }

  async getVideos(): Promise<Video[]> {
    try {
      const allVideos = await this.sql(`
        SELECT id, title, description, filename, section, is_active, created_at
        FROM videos
        ORDER BY created_at DESC
      `);
      
      return allVideos.map((video: any) => ({
        id: video.id,
        title: video.title,
        description: video.description,
        filename: video.filename,
        section: video.section,
        isActive: video.is_active,
        createdAt: new Date(video.created_at),
      }));
    } catch (error: unknown) {
      console.error("Error fetching videos from Supabase:", error);
      throw error;
    }
  }

  async getVideoBySection(section: string): Promise<Video | undefined> {
    try {
      const [video] = await this.sql(`
        SELECT id, title, description, filename, section, is_active, created_at
        FROM videos
        WHERE section = $1 AND is_active = 'true'
        ORDER BY created_at DESC
        LIMIT 1
      `, [section]);
      
      if (!video) return undefined;
      
      return {
        id: video.id,
        title: video.title,
        description: video.description,
        filename: video.filename,
        section: video.section,
        isActive: video.is_active,
        createdAt: new Date(video.created_at),
      };
    } catch (error: unknown) {
      console.error("Error fetching video by section from Supabase:", error);
      throw error;
    }
  }
}

export class MemStorage implements IStorage {
  private leads: Map<number, Lead>;
  private videos: Map<number, Video>;
  private currentLeadId: number;
  private currentVideoId: number;

  constructor() {
    this.leads = new Map();
    this.videos = new Map();
    this.currentLeadId = 1;
    this.currentVideoId = 1;
    
    // Initialize with the existing video
    this.seedInitialVideo();
  }

  private seedInitialVideo() {
    const initialVideo: Video = {
      id: this.currentVideoId++,
      title: "Tour Estância Morro Grande",
      description: "Veja de perto nosso ambiente acolhedor e estrutura preparada para oferecer o melhor cuidado em saúde mental e dependência química.",
      filename: "WhatsApp Video 2025-07-18 at 09.25.19_1752995612939.mp4",
      section: "tour",
      isActive: "true",
      createdAt: new Date(),
    };
    this.videos.set(initialVideo.id, initialVideo);
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.currentLeadId++;
    const lead: Lead = {
      ...insertLead,
      treatment: insertLead.treatment ?? null,
      insurance: insertLead.insurance ?? null,
      id,
      createdAt: new Date(),
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const id = this.currentVideoId++;
    const video: Video = {
      ...insertVideo,
      description: insertVideo.description ?? null,
      isActive: insertVideo.isActive ?? "true",
      id,
      createdAt: new Date(),
    };
    this.videos.set(id, video);
    return video;
  }

  async getVideos(): Promise<Video[]> {
    return Array.from(this.videos.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getVideoBySection(section: string): Promise<Video | undefined> {
    const videos = Array.from(this.videos.values())
      .filter(video => video.section === section && video.isActive === "true")
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return videos[0] || undefined;
  }
}

// Hybrid storage that tries Supabase but falls back to memory gracefully
class HybridStorage implements IStorage {
  private supabaseStorage: SupabaseStorage | null = null;
  private memStorage: MemStorage;
  private isSupabaseAvailable = false;

  constructor() {
    this.memStorage = new MemStorage();
    
    if (process.env.DATABASE_URL) {
      try {
        console.log("🗄️ Attempting Supabase connection...");
        this.supabaseStorage = new SupabaseStorage();
        this.testSupabaseConnection();
      } catch (error: unknown) {
        console.warn("⚠️ Supabase initialization failed:", (error as Error).message);
        this.supabaseStorage = null;
      }
    } else {
      console.log("💾 No DATABASE_URL found, using memory storage");
    }
  }

  private async testSupabaseConnection() {
    if (!this.supabaseStorage) return;
    
    try {
      await this.supabaseStorage.getLeads();
      this.isSupabaseAvailable = true;
      console.log("✅ Supabase connection successful");
    } catch (error: unknown) {
      console.warn("⚠️ Supabase connection test failed:", (error as Error).message);
      this.isSupabaseAvailable = false;
    }
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    // Try Supabase first, fallback to memory
    if (this.isSupabaseAvailable && this.supabaseStorage) {
      try {
        const lead = await this.supabaseStorage.createLead(insertLead);
        console.log("📝 Lead saved to Supabase");
        return lead;
      } catch (error: unknown) {
        console.warn("⚠️ Supabase save failed, using memory storage:", (error as Error).message);
        this.isSupabaseAvailable = false;
      }
    }
    
    console.log("📝 Lead saved to memory storage");
    return this.memStorage.createLead(insertLead);
  }

  async getLeads(): Promise<Lead[]> {
    // Try Supabase first, fallback to memory
    if (this.isSupabaseAvailable && this.supabaseStorage) {
      try {
        const leads = await this.supabaseStorage.getLeads();
        console.log(`📋 Retrieved ${leads.length} leads from Supabase`);
        return leads;
      } catch (error: unknown) {
        console.warn("⚠️ Supabase fetch failed, using memory storage:", (error as Error).message);
        this.isSupabaseAvailable = false;
      }
    }
    
    const leads = await this.memStorage.getLeads();
    console.log(`📋 Retrieved ${leads.length} leads from memory storage`);
    return leads;
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    // Try Supabase first, fallback to memory
    if (this.isSupabaseAvailable && this.supabaseStorage) {
      try {
        const video = await this.supabaseStorage.createVideo(insertVideo);
        console.log("🎥 Video saved to Supabase");
        return video;
      } catch (error: unknown) {
        console.warn("⚠️ Supabase video save failed, using memory storage:", (error as Error).message);
        this.isSupabaseAvailable = false;
      }
    }
    
    console.log("🎥 Video saved to memory storage");
    return this.memStorage.createVideo(insertVideo);
  }

  async getVideos(): Promise<Video[]> {
    // Try Supabase first, fallback to memory
    if (this.isSupabaseAvailable && this.supabaseStorage) {
      try {
        const videos = await this.supabaseStorage.getVideos();
        console.log(`🎬 Retrieved ${videos.length} videos from Supabase`);
        return videos;
      } catch (error: unknown) {
        console.warn("⚠️ Supabase video fetch failed, using memory storage:", (error as Error).message);
        this.isSupabaseAvailable = false;
      }
    }
    
    const videos = await this.memStorage.getVideos();
    console.log(`🎬 Retrieved ${videos.length} videos from memory storage`);
    return videos;
  }

  async getVideoBySection(section: string): Promise<Video | undefined> {
    // Try Supabase first, fallback to memory
    if (this.isSupabaseAvailable && this.supabaseStorage) {
      try {
        const video = await this.supabaseStorage.getVideoBySection(section);
        console.log(`🎥 Retrieved video for section "${section}" from Supabase`);
        return video;
      } catch (error: unknown) {
        console.warn("⚠️ Supabase video fetch failed, using memory storage:", (error as Error).message);
        this.isSupabaseAvailable = false;
      }
    }
    
    const video = await this.memStorage.getVideoBySection(section);
    console.log(`🎥 Retrieved video for section "${section}" from memory storage`);
    return video;
  }
}

// Use only memory storage for now due to Supabase connectivity issues in Replit
console.log("💾 Using memory storage (Supabase connectivity issues)");
export const storage = new MemStorage();

import { 
  leads, 
  videos, 
  whatsappConfig, 
  whatsappLogs,
  type Lead, 
  type InsertLead, 
  type Video, 
  type InsertVideo,
  type WhatsappConfig,
  type InsertWhatsappConfig,
  type WhatsappLog,
  type InsertWhatsappLog
} from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { neon } from "@neondatabase/serverless";
import { desc, eq } from "drizzle-orm";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  createVideo(video: InsertVideo): Promise<Video>;
  getVideos(): Promise<Video[]>;
  getVideoBySection(section: string): Promise<Video | undefined>;
  
  // WhatsApp Configuration methods
  createWhatsappConfig(config: InsertWhatsappConfig): Promise<WhatsappConfig>;
  getActiveWhatsappConfig(): Promise<WhatsappConfig | undefined>;
  updateWhatsappConfig(id: number, config: Partial<InsertWhatsappConfig>): Promise<WhatsappConfig | undefined>;
  
  // WhatsApp Logs methods
  createWhatsappLog(log: InsertWhatsappLog): Promise<WhatsappLog>;
  getWhatsappLogs(): Promise<WhatsappLog[]>;
  getWhatsappLogsByLead(leadId: string): Promise<WhatsappLog[]>;
}

export class DatabaseStorage implements IStorage {
  private sql;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is required for PostgreSQL storage");
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
      
      // Create the whatsapp_config table if it doesn't exist
      await this.sql(`
        CREATE TABLE IF NOT EXISTS whatsapp_config (
          id SERIAL PRIMARY KEY,
          provider_name TEXT NOT NULL,
          is_active TEXT DEFAULT 'true' NOT NULL,
          api_token TEXT NOT NULL,
          phone_number TEXT NOT NULL,
          template_message TEXT NOT NULL,
          webhook_url TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
      
      // Create the whatsapp_logs table if it doesn't exist
      await this.sql(`
        CREATE TABLE IF NOT EXISTS whatsapp_logs (
          id SERIAL PRIMARY KEY,
          lead_id TEXT NOT NULL,
          phone_number TEXT NOT NULL,
          message TEXT NOT NULL,
          status TEXT NOT NULL,
          provider_id TEXT,
          error_message TEXT,
          sent_at TIMESTAMP DEFAULT NOW()
        );
      `);
      
      // Seed initial video if not exists
      const existingVideos = await this.sql(`SELECT COUNT(*) as count FROM videos WHERE section = 'tour'`);
      if (existingVideos[0].count === 0) {
        await this.sql(`
          INSERT INTO videos (title, description, filename, section, is_active, created_at)
          VALUES ($1, $2, $3, $4, $5, NOW())
        `, [
          "Tour Estância Morro Grande",
          "Veja de perto nosso ambiente acolhedor e estrutura preparada para oferecer o melhor cuidado em saúde mental e dependência química.",
          "WhatsApp Video 2025-07-18 at 09.25.19_1752995612939.mp4",
          "tour",
          "true"
        ]);
        console.log("📹 Initial video seeded");
      }
      
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
      console.error("Error creating lead in PostgreSQL:", error);
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
      console.error("Error fetching leads from PostgreSQL:", error);
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
      console.error("Error creating video in PostgreSQL:", error);
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
      console.error("Error fetching videos from PostgreSQL:", error);
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
      console.error("Error fetching video by section from PostgreSQL:", error);
      throw error;
    }
  }

  // WhatsApp Configuration methods
  async createWhatsappConfig(config: InsertWhatsappConfig): Promise<WhatsappConfig> {
    try {
      const [whatsappConfig] = await this.sql(`
        INSERT INTO whatsapp_config (provider_name, is_active, api_token, phone_number, template_message, webhook_url, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW())
        RETURNING id, provider_name, is_active, api_token, phone_number, template_message, webhook_url, created_at
      `, [
        config.providerName,
        config.isActive || 'true',
        config.apiToken,
        config.phoneNumber,
        config.templateMessage,
        config.webhookUrl || null,
      ]);
      
      return {
        id: whatsappConfig.id,
        providerName: whatsappConfig.provider_name,
        isActive: whatsappConfig.is_active,
        apiToken: whatsappConfig.api_token,
        phoneNumber: whatsappConfig.phone_number,
        templateMessage: whatsappConfig.template_message,
        webhookUrl: whatsappConfig.webhook_url,
        createdAt: new Date(whatsappConfig.created_at),
      };
    } catch (error: unknown) {
      console.error("Error creating WhatsApp config in PostgreSQL:", error);
      throw error;
    }
  }

  async getActiveWhatsappConfig(): Promise<WhatsappConfig | undefined> {
    try {
      const [config] = await this.sql(`
        SELECT id, provider_name, is_active, api_token, phone_number, template_message, webhook_url, created_at
        FROM whatsapp_config
        WHERE is_active = 'true'
        ORDER BY created_at DESC
        LIMIT 1
      `);
      
      if (!config) return undefined;
      
      return {
        id: config.id,
        providerName: config.provider_name,
        isActive: config.is_active,
        apiToken: config.api_token,
        phoneNumber: config.phone_number,
        templateMessage: config.template_message,
        webhookUrl: config.webhook_url,
        createdAt: new Date(config.created_at),
      };
    } catch (error: unknown) {
      console.error("Error fetching active WhatsApp config from PostgreSQL:", error);
      throw error;
    }
  }

  async updateWhatsappConfig(id: number, config: Partial<InsertWhatsappConfig>): Promise<WhatsappConfig | undefined> {
    try {
      const setClause = Object.keys(config).map((key, index) => `${key} = $${index + 2}`).join(', ');
      const values = [id, ...Object.values(config)];
      
      const [updatedConfig] = await this.sql(`
        UPDATE whatsapp_config 
        SET ${setClause}
        WHERE id = $1
        RETURNING id, provider_name, is_active, api_token, phone_number, template_message, webhook_url, created_at
      `, values);
      
      if (!updatedConfig) return undefined;
      
      return {
        id: updatedConfig.id,
        providerName: updatedConfig.provider_name,
        isActive: updatedConfig.is_active,
        apiToken: updatedConfig.api_token,
        phoneNumber: updatedConfig.phone_number,
        templateMessage: updatedConfig.template_message,
        webhookUrl: updatedConfig.webhook_url,
        createdAt: new Date(updatedConfig.created_at),
      };
    } catch (error: unknown) {
      console.error("Error updating WhatsApp config in PostgreSQL:", error);
      throw error;
    }
  }

  // WhatsApp Logs methods
  async createWhatsappLog(log: InsertWhatsappLog): Promise<WhatsappLog> {
    try {
      const [whatsappLog] = await this.sql(`
        INSERT INTO whatsapp_logs (lead_id, phone_number, message, status, provider_id, error_message, sent_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW())
        RETURNING id, lead_id, phone_number, message, status, provider_id, error_message, sent_at
      `, [
        log.leadId,
        log.phoneNumber,
        log.message,
        log.status,
        log.providerId || null,
        log.errorMessage || null,
      ]);
      
      return {
        id: whatsappLog.id,
        leadId: whatsappLog.lead_id,
        phoneNumber: whatsappLog.phone_number,
        message: whatsappLog.message,
        status: whatsappLog.status,
        providerId: whatsappLog.provider_id,
        errorMessage: whatsappLog.error_message,
        sentAt: new Date(whatsappLog.sent_at),
      };
    } catch (error: unknown) {
      console.error("Error creating WhatsApp log in PostgreSQL:", error);
      throw error;
    }
  }

  async getWhatsappLogs(): Promise<WhatsappLog[]> {
    try {
      const allLogs = await this.sql(`
        SELECT id, lead_id, phone_number, message, status, provider_id, error_message, sent_at
        FROM whatsapp_logs
        ORDER BY sent_at DESC
      `);
      
      return allLogs.map((log: any) => ({
        id: log.id,
        leadId: log.lead_id,
        phoneNumber: log.phone_number,
        message: log.message,
        status: log.status,
        providerId: log.provider_id,
        errorMessage: log.error_message,
        sentAt: new Date(log.sent_at),
      }));
    } catch (error: unknown) {
      console.error("Error fetching WhatsApp logs from PostgreSQL:", error);
      throw error;
    }
  }

  async getWhatsappLogsByLead(leadId: string): Promise<WhatsappLog[]> {
    try {
      const logs = await this.sql(`
        SELECT id, lead_id, phone_number, message, status, provider_id, error_message, sent_at
        FROM whatsapp_logs
        WHERE lead_id = $1
        ORDER BY sent_at DESC
      `, [leadId]);
      
      return logs.map((log: any) => ({
        id: log.id,
        leadId: log.lead_id,
        phoneNumber: log.phone_number,
        message: log.message,
        status: log.status,
        providerId: log.provider_id,
        errorMessage: log.error_message,
        sentAt: new Date(log.sent_at),
      }));
    } catch (error: unknown) {
      console.error("Error fetching WhatsApp logs by lead from PostgreSQL:", error);
      throw error;
    }
  }
}

export class MemStorage implements IStorage {
  private leads: Map<number, Lead>;
  private videos: Map<number, Video>;
  private whatsappConfigs: Map<number, WhatsappConfig>;
  private whatsappLogs: Map<number, WhatsappLog>;
  private currentLeadId: number;
  private currentVideoId: number;
  private currentConfigId: number;
  private currentLogId: number;

  constructor() {
    this.leads = new Map();
    this.videos = new Map();
    this.whatsappConfigs = new Map();
    this.whatsappLogs = new Map();
    this.currentLeadId = 1;
    this.currentVideoId = 1;
    this.currentConfigId = 1;
    this.currentLogId = 1;
    
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

  // WhatsApp Configuration methods
  async createWhatsappConfig(config: InsertWhatsappConfig): Promise<WhatsappConfig> {
    const id = this.currentConfigId++;
    const whatsappConfig: WhatsappConfig = {
      ...config,
      isActive: config.isActive ?? "true",
      webhookUrl: config.webhookUrl ?? null,
      id,
      createdAt: new Date(),
    };
    this.whatsappConfigs.set(id, whatsappConfig);
    return whatsappConfig;
  }

  async getActiveWhatsappConfig(): Promise<WhatsappConfig | undefined> {
    const configs = Array.from(this.whatsappConfigs.values())
      .filter(config => config.isActive === "true")
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return configs[0] || undefined;
  }

  async updateWhatsappConfig(id: number, config: Partial<InsertWhatsappConfig>): Promise<WhatsappConfig | undefined> {
    const existing = this.whatsappConfigs.get(id);
    if (!existing) return undefined;
    
    const updated: WhatsappConfig = { ...existing, ...config };
    this.whatsappConfigs.set(id, updated);
    return updated;
  }

  // WhatsApp Logs methods
  async createWhatsappLog(log: InsertWhatsappLog): Promise<WhatsappLog> {
    const id = this.currentLogId++;
    const whatsappLog: WhatsappLog = {
      ...log,
      providerId: log.providerId ?? null,
      errorMessage: log.errorMessage ?? null,
      id,
      sentAt: new Date(),
    };
    this.whatsappLogs.set(id, whatsappLog);
    return whatsappLog;
  }

  async getWhatsappLogs(): Promise<WhatsappLog[]> {
    return Array.from(this.whatsappLogs.values()).sort(
      (a, b) => b.sentAt.getTime() - a.sentAt.getTime()
    );
  }

  async getWhatsappLogsByLead(leadId: string): Promise<WhatsappLog[]> {
    return Array.from(this.whatsappLogs.values())
      .filter(log => log.leadId === leadId)
      .sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
  }
}

// Hybrid storage that tries PostgreSQL but falls back to memory gracefully
class HybridStorage implements IStorage {
  private databaseStorage: DatabaseStorage | null = null;
  private memStorage: MemStorage;
  private isDatabaseAvailable = false;

  constructor() {
    this.memStorage = new MemStorage();
    
    if (process.env.DATABASE_URL) {
      try {
        console.log("🗄️ Attempting PostgreSQL connection...");
        this.databaseStorage = new DatabaseStorage();
        this.testDatabaseConnection();
      } catch (error: unknown) {
        console.warn("⚠️ PostgreSQL initialization failed:", (error as Error).message);
        this.databaseStorage = null;
      }
    } else {
      console.log("💾 No DATABASE_URL found, using memory storage");
    }
  }

  private async testDatabaseConnection() {
    if (!this.databaseStorage) return;
    
    try {
      await this.databaseStorage.getLeads();
      this.isDatabaseAvailable = true;
      console.log("✅ PostgreSQL connection successful");
    } catch (error: unknown) {
      console.warn("⚠️ PostgreSQL connection test failed:", (error as Error).message);
      this.isDatabaseAvailable = false;
    }
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    // Try PostgreSQL first, fallback to memory
    if (this.isDatabaseAvailable && this.databaseStorage) {
      try {
        const lead = await this.databaseStorage.createLead(insertLead);
        console.log("📝 Lead saved to PostgreSQL database with timestamp");
        return lead;
      } catch (error: unknown) {
        console.warn("⚠️ PostgreSQL save failed, using memory storage:", (error as Error).message);
        this.isDatabaseAvailable = false;
      }
    }
    
    console.log("📝 Lead saved to memory storage");
    return this.memStorage.createLead(insertLead);
  }

  async getLeads(): Promise<Lead[]> {
    // Try PostgreSQL first, fallback to memory
    if (this.isDatabaseAvailable && this.databaseStorage) {
      try {
        const leads = await this.databaseStorage.getLeads();
        console.log(`📋 Retrieved ${leads.length} leads from PostgreSQL database (ordered by date)`);
        return leads;
      } catch (error: unknown) {
        console.warn("⚠️ PostgreSQL fetch failed, using memory storage:", (error as Error).message);
        this.isDatabaseAvailable = false;
      }
    }
    
    const leads = await this.memStorage.getLeads();
    console.log(`📋 Retrieved ${leads.length} leads from memory storage`);
    return leads;
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    // Try PostgreSQL first, fallback to memory
    if (this.isDatabaseAvailable && this.databaseStorage) {
      try {
        const video = await this.databaseStorage.createVideo(insertVideo);
        console.log("🎥 Video saved to PostgreSQL database");
        return video;
      } catch (error: unknown) {
        console.warn("⚠️ PostgreSQL video save failed, using memory storage:", (error as Error).message);
        this.isDatabaseAvailable = false;
      }
    }
    
    console.log("🎥 Video saved to memory storage");
    return this.memStorage.createVideo(insertVideo);
  }

  async getVideos(): Promise<Video[]> {
    // Try PostgreSQL first, fallback to memory
    if (this.isDatabaseAvailable && this.databaseStorage) {
      try {
        const videos = await this.databaseStorage.getVideos();
        console.log(`🎬 Retrieved ${videos.length} videos from PostgreSQL database`);
        return videos;
      } catch (error: unknown) {
        console.warn("⚠️ PostgreSQL video fetch failed, using memory storage:", (error as Error).message);
        this.isDatabaseAvailable = false;
      }
    }
    
    const videos = await this.memStorage.getVideos();
    console.log(`🎬 Retrieved ${videos.length} videos from memory storage`);
    return videos;
  }

  async getVideoBySection(section: string): Promise<Video | undefined> {
    // Try PostgreSQL first, fallback to memory
    if (this.isDatabaseAvailable && this.databaseStorage) {
      try {
        const video = await this.databaseStorage.getVideoBySection(section);
        console.log(`🎥 Retrieved video for section "${section}" from PostgreSQL database`);
        return video;
      } catch (error: unknown) {
        console.warn("⚠️ PostgreSQL video fetch failed, using memory storage:", (error as Error).message);
        this.isDatabaseAvailable = false;
      }
    }
    
    const video = await this.memStorage.getVideoBySection(section);
    console.log(`🎥 Retrieved video for section "${section}" from memory storage`);
    return video;
  }

  // WhatsApp Configuration methods
  async createWhatsappConfig(config: InsertWhatsappConfig): Promise<WhatsappConfig> {
    if (this.isDatabaseAvailable && this.databaseStorage) {
      try {
        const whatsappConfig = await this.databaseStorage.createWhatsappConfig(config);
        console.log("📱 WhatsApp config saved to PostgreSQL database");
        return whatsappConfig;
      } catch (error: unknown) {
        console.warn("⚠️ PostgreSQL WhatsApp config save failed, using memory storage:", (error as Error).message);
        this.isDatabaseAvailable = false;
      }
    }
    
    console.log("📱 WhatsApp config saved to memory storage");
    return this.memStorage.createWhatsappConfig(config);
  }

  async getActiveWhatsappConfig(): Promise<WhatsappConfig | undefined> {
    if (this.isDatabaseAvailable && this.databaseStorage) {
      try {
        const config = await this.databaseStorage.getActiveWhatsappConfig();
        console.log("📱 Retrieved active WhatsApp config from PostgreSQL database");
        return config;
      } catch (error: unknown) {
        console.warn("⚠️ PostgreSQL WhatsApp config fetch failed, using memory storage:", (error as Error).message);
        this.isDatabaseAvailable = false;
      }
    }
    
    const config = await this.memStorage.getActiveWhatsappConfig();
    console.log("📱 Retrieved active WhatsApp config from memory storage");
    return config;
  }

  async updateWhatsappConfig(id: number, config: Partial<InsertWhatsappConfig>): Promise<WhatsappConfig | undefined> {
    if (this.isDatabaseAvailable && this.databaseStorage) {
      try {
        const updatedConfig = await this.databaseStorage.updateWhatsappConfig(id, config);
        console.log("📱 WhatsApp config updated in PostgreSQL database");
        return updatedConfig;
      } catch (error: unknown) {
        console.warn("⚠️ PostgreSQL WhatsApp config update failed, using memory storage:", (error as Error).message);
        this.isDatabaseAvailable = false;
      }
    }
    
    console.log("📱 WhatsApp config updated in memory storage");
    return this.memStorage.updateWhatsappConfig(id, config);
  }

  // WhatsApp Logs methods
  async createWhatsappLog(log: InsertWhatsappLog): Promise<WhatsappLog> {
    if (this.isDatabaseAvailable && this.databaseStorage) {
      try {
        const whatsappLog = await this.databaseStorage.createWhatsappLog(log);
        console.log("📱 WhatsApp log saved to PostgreSQL database");
        return whatsappLog;
      } catch (error: unknown) {
        console.warn("⚠️ PostgreSQL WhatsApp log save failed, using memory storage:", (error as Error).message);
        this.isDatabaseAvailable = false;
      }
    }
    
    console.log("📱 WhatsApp log saved to memory storage");
    return this.memStorage.createWhatsappLog(log);
  }

  async getWhatsappLogs(): Promise<WhatsappLog[]> {
    if (this.isDatabaseAvailable && this.databaseStorage) {
      try {
        const logs = await this.databaseStorage.getWhatsappLogs();
        console.log(`📱 Retrieved ${logs.length} WhatsApp logs from PostgreSQL database`);
        return logs;
      } catch (error: unknown) {
        console.warn("⚠️ PostgreSQL WhatsApp logs fetch failed, using memory storage:", (error as Error).message);
        this.isDatabaseAvailable = false;
      }
    }
    
    const logs = await this.memStorage.getWhatsappLogs();
    console.log(`📱 Retrieved ${logs.length} WhatsApp logs from memory storage`);
    return logs;
  }

  async getWhatsappLogsByLead(leadId: string): Promise<WhatsappLog[]> {
    if (this.isDatabaseAvailable && this.databaseStorage) {
      try {
        const logs = await this.databaseStorage.getWhatsappLogsByLead(leadId);
        console.log(`📱 Retrieved ${logs.length} WhatsApp logs for lead ${leadId} from PostgreSQL database`);
        return logs;
      } catch (error: unknown) {
        console.warn("⚠️ PostgreSQL WhatsApp logs by lead fetch failed, using memory storage:", (error as Error).message);
        this.isDatabaseAvailable = false;
      }
    }
    
    const logs = await this.memStorage.getWhatsappLogsByLead(leadId);
    console.log(`📱 Retrieved ${logs.length} WhatsApp logs for lead ${leadId} from memory storage`);
    return logs;
  }
}

// Use DatabaseStorage with PostgreSQL for production lead saving
console.log("🗄️ Initializing PostgreSQL database storage...");
export const storage = new HybridStorage();

import { leads, type Lead, type InsertLead } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { neon } from "@neondatabase/serverless";
import { desc } from "drizzle-orm";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
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
      console.log("✅ Database initialized successfully");
    } catch (error) {
      console.error("⚠️ Error initializing database:", error.message);
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
    } catch (error) {
      console.error("Error fetching leads from Supabase:", error);
      throw error;
    }
  }
}

export class MemStorage implements IStorage {
  private leads: Map<number, Lead>;
  private currentId: number;

  constructor() {
    this.leads = new Map();
    this.currentId = 1;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.currentId++;
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
      } catch (error) {
        console.warn("⚠️ Supabase initialization failed:", error.message);
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
    } catch (error) {
      console.warn("⚠️ Supabase connection test failed:", error.message);
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
      } catch (error) {
        console.warn("⚠️ Supabase save failed, using memory storage:", error.message);
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
      } catch (error) {
        console.warn("⚠️ Supabase fetch failed, using memory storage:", error.message);
        this.isSupabaseAvailable = false;
      }
    }
    
    const leads = await this.memStorage.getLeads();
    console.log(`📋 Retrieved ${leads.length} leads from memory storage`);
    return leads;
  }
}

// Use only memory storage for now due to Supabase connectivity issues in Replit
console.log("💾 Using memory storage (Supabase connectivity issues)");
export const storage = new MemStorage();

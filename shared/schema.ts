import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  treatment: text("treatment"),
  insurance: text("insurance"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  filename: text("filename").notNull(),
  section: text("section").notNull(), // ex: "hero", "tour", "testimonial"
  isActive: text("is_active").default("true").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Nova tabela para configurações do WhatsApp
export const whatsappConfig = pgTable("whatsapp_config", {
  id: serial("id").primaryKey(),
  providerName: text("provider_name").notNull(), // "twilio", "meta", "zenvia", etc.
  isActive: text("is_active").default("true").notNull(),
  apiToken: text("api_token").notNull(),
  phoneNumber: text("phone_number").notNull(), // Número do WhatsApp Business
  templateMessage: text("template_message").notNull(), // Template da mensagem
  webhookUrl: text("webhook_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tabela para logs de mensagens WhatsApp enviadas
export const whatsappLogs = pgTable("whatsapp_logs", {
  id: serial("id").primaryKey(),
  leadId: text("lead_id").notNull(), // Referência ao lead
  phoneNumber: text("phone_number").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull(), // "sent", "delivered", "failed", "read"
  providerId: text("provider_id"), // ID retornado pelo provedor
  errorMessage: text("error_message"),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  createdAt: true,
});

export const insertWhatsappConfigSchema = createInsertSchema(whatsappConfig).omit({
  id: true,
  createdAt: true,
});

export const insertWhatsappLogSchema = createInsertSchema(whatsappLogs).omit({
  id: true,
  sentAt: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;
export type InsertWhatsappConfig = z.infer<typeof insertWhatsappConfigSchema>;
export type WhatsappConfig = typeof whatsappConfig.$inferSelect;
export type InsertWhatsappLog = z.infer<typeof insertWhatsappLogSchema>;
export type WhatsappLog = typeof whatsappLogs.$inferSelect;

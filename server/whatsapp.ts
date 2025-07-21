import { storage } from "./storage";
import type { InsertWhatsappLog } from "@shared/schema";

interface WhatsAppMessage {
  to: string;
  text: string;
}

// Função para normalizar números de telefone brasileiros
function normalizePhoneNumber(phone: string): string {
  // Remove todos os caracteres não numéricos
  let normalized = phone.replace(/\D/g, '');
  
  // Se começar com 0, remove
  if (normalized.startsWith('0')) {
    normalized = normalized.substring(1);
  }
  
  // Se não começar com 55 (código do Brasil), adiciona
  if (!normalized.startsWith('55')) {
    normalized = '55' + normalized;
  }
  
  // Garante que números móveis têm o 9 após o DDD
  if (normalized.length === 12 && normalized.startsWith('55')) {
    const ddd = normalized.substring(2, 4);
    const number = normalized.substring(4);
    
    // Se é um número móvel (8 ou 9 dígitos) e não tem o 9, adiciona
    if (number.length === 8 && !number.startsWith('9')) {
      normalized = '55' + ddd + '9' + number;
    }
  }
  
  return '+' + normalized;
}

// Função para personalizar a mensagem com dados do lead
function personalizeMessage(template: string, leadData: any): string {
  const now = new Date();
  const dateTime = now.toLocaleString('pt-BR', { 
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return template
    .replace(/{nome}/g, leadData.name || 'Cliente')
    .replace(/{telefone}/g, leadData.phone || '')
    .replace(/{tratamento}/g, leadData.treatment || 'tratamento personalizado')
    .replace(/{plano}/g, leadData.insurance || 'plano disponível')
    .replace(/\$\(date\)/g, dateTime);
}

// Simulação de envio via WhatsApp Business API
async function sendWhatsAppMessage(config: any, message: WhatsAppMessage): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    console.log(`📱 Simulando envio WhatsApp via ${config.providerName}:`);
    console.log(`📞 Para: ${message.to}`);
    console.log(`💬 Mensagem: ${message.text}`);
    
    // Aqui você integraria com a API real do WhatsApp
    // Por exemplo, com Twilio:
    /*
    const client = require('twilio')(config.accountSid, config.authToken);
    const sentMessage = await client.messages.create({
      body: message.text,
      from: `whatsapp:${config.phoneNumber}`,
      to: `whatsapp:${message.to}`
    });
    return { success: true, messageId: sentMessage.sid };
    */
    
    // Para Meta WhatsApp Business API:
    /*
    const response = await fetch(`https://graph.facebook.com/v17.0/${config.phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: message.to.replace('+', ''),
        type: 'text',
        text: { body: message.text }
      })
    });
    
    const data = await response.json();
    if (response.ok) {
      return { success: true, messageId: data.messages[0].id };
    } else {
      return { success: false, error: data.error?.message || 'Erro desconhecido' };
    }
    */
    
    // Simulação para desenvolvimento
    const mockMessageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Simula um pequeno delay como se fosse uma API real
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { 
      success: true, 
      messageId: mockMessageId 
    };
    
  } catch (error: any) {
    console.error('❌ Erro ao enviar mensagem WhatsApp:', error);
    return { 
      success: false, 
      error: error.message || 'Erro interno no envio' 
    };
  }
}

export async function sendLeadNotification(leadId: string, leadData: any): Promise<void> {
  try {
    console.log(`📱 Iniciando envio de notificação WhatsApp para lead ${leadId}`);
    
    // Busca a configuração ativa do WhatsApp
    const config = await storage.getActiveWhatsappConfig();
    
    if (!config) {
      console.warn('⚠️ Nenhuma configuração WhatsApp ativa encontrada');
      await storage.createWhatsappLog({
        leadId,
        phoneNumber: leadData.phone,
        message: 'Tentativa de envio sem configuração',
        status: 'failed',
        errorMessage: 'Configuração WhatsApp não encontrada'
      });
      return;
    }
    
    // Número de destino fixo da Estância Morro Grande
    const destinationPhone = "+5515996834387";
    
    // Personaliza a mensagem com os dados do lead
    const personalizedMessage = personalizeMessage(config.templateMessage, leadData);
    
    // Envia a mensagem para o número da clínica
    const result = await sendWhatsAppMessage(config, {
      to: destinationPhone,
      text: personalizedMessage
    });
    
    // Registra o log da tentativa
    await storage.createWhatsappLog({
      leadId,
      phoneNumber: destinationPhone,
      message: personalizedMessage,
      status: result.success ? 'sent' : 'failed',
      providerId: result.messageId,
      errorMessage: result.error
    });
    
    if (result.success) {
      console.log(`✅ Notificação de novo lead enviada para ${destinationPhone}`);
      console.log(`📱 ID da mensagem: ${result.messageId}`);
      console.log(`👤 Lead: ${leadData.name} (${leadData.phone})`);
    } else {
      console.error(`❌ Falha ao enviar notificação: ${result.error}`);
    }
    
  } catch (error: any) {
    console.error('❌ Erro geral no envio de notificação WhatsApp:', error);
    
    // Registra o erro
    await storage.createWhatsappLog({
      leadId,
      phoneNumber: "+5515996834387",
      message: 'Erro interno no processamento',
      status: 'failed',
      errorMessage: error.message
    });
  }
}

// Função para configurar o WhatsApp (para usar no admin)
export async function setupWhatsAppIntegration(config: {
  providerName: string;
  apiToken: string;
  phoneNumber: string;
  templateMessage?: string;
  webhookUrl?: string;
}) {
  const defaultTemplate = `Olá {nome}! 👋

Recebemos seu interesse em nossos serviços de {tratamento} na Estância Morro Grande.

Nossa equipe especializada entrará em contato em breve para agendar uma avaliação personalizada.

🏥 *Estância Morro Grande*
📍 Estrada Nakayama 150, Rodovia Bunjiro Nakao km 67,5
📧 contato@estanciamorrogrande.com.br

Estamos aqui para cuidar de você! 💚`;

  const whatsappConfig = await storage.createWhatsappConfig({
    providerName: config.providerName,
    apiToken: config.apiToken,
    phoneNumber: config.phoneNumber,
    templateMessage: config.templateMessage || defaultTemplate,
    webhookUrl: config.webhookUrl,
    isActive: 'true'
  });

  console.log('📱 Configuração WhatsApp criada:', {
    id: whatsappConfig.id,
    provider: whatsappConfig.providerName,
    phone: whatsappConfig.phoneNumber
  });

  return whatsappConfig;
}
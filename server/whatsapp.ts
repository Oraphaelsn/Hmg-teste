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

// Integração real com WhatsApp Business API
async function sendWhatsAppMessage(config: any, message: WhatsAppMessage): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    console.log(`📱 Enviando WhatsApp via ${config.providerName}:`);
    console.log(`📞 Para: ${message.to}`);
    console.log(`💬 Mensagem: ${message.text}`);
    
    // Meta WhatsApp Business API (Recomendado)
    if (config.providerName === 'meta' || config.providerName === 'facebook') {
      const phoneNumberId = config.phoneNumberId || config.phoneNumber.replace(/\D/g, '');
      const response = await fetch(`https://graph.facebook.com/v18.0/${phoneNumberId}/messages`, {
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
      if (response.ok && data.messages) {
        return { success: true, messageId: data.messages[0].id };
      } else {
        return { success: false, error: data.error?.message || 'Erro na API do Meta WhatsApp' };
      }
    }
    
    // Twilio WhatsApp API
    if (config.providerName === 'twilio') {
      const accountSid = config.accountSid || config.apiToken.split(':')[0];
      const authToken = config.authToken || config.apiToken.split(':')[1] || config.apiToken;
      
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          From: `whatsapp:${config.phoneNumber}`,
          To: `whatsapp:${message.to}`,
          Body: message.text
        })
      });
      
      const data = await response.json();
      if (response.ok && data.sid) {
        return { success: true, messageId: data.sid };
      } else {
        return { success: false, error: data.message || 'Erro na API do Twilio' };
      }
    }
    
    // Evolution API (Alternativa brasileira popular)
    if (config.providerName === 'evolution') {
      const response = await fetch(`${config.webhookUrl || 'https://api.evolution.com.br'}/message/sendText/${config.instanceName || 'default'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': config.apiToken
        },
        body: JSON.stringify({
          number: message.to.replace('+', ''),
          textMessage: {
            text: message.text
          }
        })
      });
      
      const data = await response.json();
      if (response.ok && data.key) {
        return { success: true, messageId: data.key.id };
      } else {
        return { success: false, error: data.message || 'Erro na Evolution API' };
      }
    }
    
    // Se chegou aqui, o provedor não é suportado ou não foi configurado
    console.warn(`⚠️ Provedor ${config.providerName} não configurado para envio real`);
    return { 
      success: false, 
      error: `Provedor ${config.providerName} requer configuração adicional. Configure as credenciais corretas.` 
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
  const defaultTemplate = `🌿 *Olá, Estância Morro Grande!* 🌿

Gostaria de saber mais informações sobre os tratamentos disponíveis.

👤 *Meu nome:* {nome}
📞 *Telefone para contato:* {telefone}
💊 *Tipo de tratamento:* {tratamento}
🏥 *Plano de saúde:* {plano}

📅 *Solicitado em:* $(date)

Aguardo retorno para agendar uma conversa. Obrigado(a)!

💚 _Mensagem enviada automaticamente pelo site_`;

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
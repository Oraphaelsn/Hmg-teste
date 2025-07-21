import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Settings, History, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';

interface WhatsAppConfig {
  id: number;
  providerName: string;
  isActive: string;
  apiToken: string;
  phoneNumber: string;
  templateMessage: string;
  webhookUrl?: string;
  createdAt: string;
}

interface WhatsAppLog {
  id: number;
  leadId: string;
  phoneNumber: string;
  message: string;
  status: 'sent' | 'delivered' | 'failed' | 'read';
  providerId?: string;
  errorMessage?: string;
  sentAt: string;
}

interface Lead {
  id: number;
  name: string;
  phone: string;
  treatment?: string;
  insurance?: string;
  createdAt: string;
}

export default function WhatsAppAdmin() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('config');

  // Configuração WhatsApp
  const { data: config, isLoading: configLoading } = useQuery({
    queryKey: ['/api/whatsapp/config'],
    queryFn: () => apiRequest('/api/whatsapp/config'),
  });

  // Logs WhatsApp
  const { data: logs = [], isLoading: logsLoading } = useQuery({
    queryKey: ['/api/whatsapp/logs'],
    queryFn: () => apiRequest('/api/whatsapp/logs'),
  });

  // Leads
  const { data: leads = [], isLoading: leadsLoading } = useQuery({
    queryKey: ['/api/leads'],
    queryFn: () => apiRequest('/api/leads'),
  });

  // Mutation para configurar WhatsApp
  const configMutation = useMutation({
    mutationFn: (data: any) => apiRequest('/api/whatsapp/setup', { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),
    onSuccess: () => {
      toast({ title: 'Configuração salva com sucesso!' });
      queryClient.invalidateQueries({ queryKey: ['/api/whatsapp/config'] });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao salvar configuração', 
        description: error.message,
        variant: 'destructive' 
      });
    }
  });

  const [formData, setFormData] = useState({
    providerName: 'meta',
    apiToken: '',
    phoneNumber: '+5515996834387',
    phoneNumberId: '',
    templateMessage: `🏥 *NOVO LEAD - Estância Morro Grande* 🏥

👤 *Nome:* {nome}
📞 *Telefone:* {telefone}
💊 *Tratamento:* {tratamento}
🏥 *Plano:* {plano}

📅 *Data/Hora:* 21/07/2025, 14:00

🔔 Entre em contato o mais rápido possível!

📧 contato@estanciamorrogrande.com.br`
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    configMutation.mutate(formData);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Enviado</Badge>;
      case 'delivered':
        return <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="w-3 h-3 mr-1" />Entregue</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Falhou</Badge>;
      case 'read':
        return <Badge className="bg-purple-100 text-purple-800"><CheckCircle className="w-3 h-3 mr-1" />Lido</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800"><Clock className="w-3 h-3 mr-1" />Pendente</Badge>;
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLeadName = (leadId: string) => {
    const lead = leads.find((l: Lead) => l.id.toString() === leadId);
    return lead?.name || `Lead #${leadId}`;
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          WhatsApp Business - Estância Morro Grande
        </h1>
        <p className="text-gray-600">
          Configure e monitore as notificações automáticas de leads via WhatsApp
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="config" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configuração
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            Histórico de Mensagens
          </TabsTrigger>
          <TabsTrigger value="leads" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Leads Recebidos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuração WhatsApp Business</CardTitle>
              <CardDescription>
                Configure as credenciais da API do WhatsApp para receber notificações automáticas de novos leads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="provider">Provedor da API</Label>
                    <select
                      id="provider"
                      value={formData.providerName}
                      onChange={(e) => setFormData({ ...formData, providerName: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="meta">Meta (WhatsApp Business API)</option>
                      <option value="twilio">Twilio</option>
                      <option value="evolution">Evolution API</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="phoneNumber">Número WhatsApp Destino</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="+5515996834387"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="apiToken">Token da API</Label>
                  <Input
                    id="apiToken"
                    type="password"
                    value={formData.apiToken}
                    onChange={(e) => setFormData({ ...formData, apiToken: e.target.value })}
                    placeholder="Seu token da API do WhatsApp"
                  />
                </div>

                {formData.providerName === 'meta' && (
                  <div>
                    <Label htmlFor="phoneNumberId">Phone Number ID (Meta)</Label>
                    <Input
                      id="phoneNumberId"
                      value={formData.phoneNumberId}
                      onChange={(e) => setFormData({ ...formData, phoneNumberId: e.target.value })}
                      placeholder="ID do número de telefone no Meta Business"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="template">Template da Mensagem</Label>
                  <Textarea
                    id="template"
                    value={formData.templateMessage}
                    onChange={(e) => setFormData({ ...formData, templateMessage: e.target.value })}
                    rows={8}
                    placeholder="Use {nome}, {telefone}, {tratamento}, {plano} para personalizar"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={configMutation.isPending}
                  className="w-full"
                >
                  {configMutation.isPending ? 'Salvando...' : 'Salvar Configuração'}
                </Button>
              </form>

              {config && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Configuração Atual</h3>
                  <p className="text-sm text-green-700">
                    Provedor: {config.providerName} | 
                    Número: {config.phoneNumber} | 
                    Status: {config.isActive === 'true' ? 'Ativo' : 'Inativo'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Mensagens WhatsApp</CardTitle>
              <CardDescription>
                Todas as mensagens enviadas automaticamente para notificação de novos leads
              </CardDescription>
            </CardHeader>
            <CardContent>
              {logsLoading ? (
                <div className="text-center py-4">Carregando histórico...</div>
              ) : logs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Nenhuma mensagem enviada ainda
                </div>
              ) : (
                <div className="space-y-4">
                  {logs.map((log: WhatsAppLog) => (
                    <div key={log.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{getLeadName(log.leadId)}</p>
                          <p className="text-sm text-gray-600">
                            Para: {log.phoneNumber} • {formatDateTime(log.sentAt)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(log.status)}
                          {log.providerId && (
                            <Badge variant="outline" className="text-xs">
                              ID: {log.providerId.substring(0, 8)}...
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded text-sm">
                        <pre className="whitespace-pre-wrap font-sans">{log.message}</pre>
                      </div>
                      
                      {log.errorMessage && (
                        <div className="bg-red-50 p-2 rounded text-sm text-red-700">
                          Erro: {log.errorMessage}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Leads Recebidos</CardTitle>
              <CardDescription>
                Todos os leads capturados pelo formulário da landing page
              </CardDescription>
            </CardHeader>
            <CardContent>
              {leadsLoading ? (
                <div className="text-center py-4">Carregando leads...</div>
              ) : leads.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Nenhum lead recebido ainda
                </div>
              ) : (
                <div className="space-y-4">
                  {leads.map((lead: Lead) => {
                    const leadLogs = logs.filter((log: WhatsAppLog) => log.leadId === lead.id.toString());
                    const lastLog = leadLogs[0];
                    
                    return (
                      <div key={lead.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{lead.name}</h3>
                            <p className="text-gray-600">
                              {lead.phone} • {formatDateTime(lead.createdAt)}
                            </p>
                            {lead.treatment && (
                              <p className="text-sm text-blue-600">
                                Tratamento: {lead.treatment}
                              </p>
                            )}
                            {lead.insurance && (
                              <p className="text-sm text-green-600">
                                Plano: {lead.insurance}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            {lastLog ? (
                              <div className="space-y-1">
                                {getStatusBadge(lastLog.status)}
                                <p className="text-xs text-gray-500">
                                  {formatDateTime(lastLog.sentAt)}
                                </p>
                              </div>
                            ) : (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-800">
                                Sem notificação
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {leadLogs.length > 0 && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              Histórico de notificações ({leadLogs.length}):
                            </p>
                            <div className="space-y-1">
                              {leadLogs.slice(0, 3).map((log: WhatsAppLog) => (
                                <div key={log.id} className="flex justify-between items-center text-xs">
                                  <span>{formatDateTime(log.sentAt)}</span>
                                  {getStatusBadge(log.status)}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
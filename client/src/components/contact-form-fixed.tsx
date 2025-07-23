import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Send } from "lucide-react";
import backgroundImage from "@assets/2021-09-22_1752972757556.webp";

export default function ContactFormFixed() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      phone: "",
      treatment: "",
      insurance: "",
    },
  });

  const submitLead = useMutation({
    mutationFn: async (data: InsertLead) => {
      const response = await apiRequest("POST", "/api/leads", data);
      return response.json();
    },
    onSuccess: (response, data) => {
      setIsSubmitted(true);
      form.reset();
      
      // Criar mensagem WhatsApp formatada
      const treatmentLabels: { [key: string]: string } = {
        'saude-mental': 'Saúde Mental',
        'dependencia-quimica': 'Dependência Química',
        'transtornos-alimentares': 'Transtornos Alimentares',
        'terapia-familiar': 'Terapia Familiar',
        'ambos': 'Saúde Mental + Dependência Química',
        'nao-sei': 'Não sei qual preciso'
      };
      
      const insuranceLabels: { [key: string]: string } = {
        'vivest': 'Vivest Funcesp',
        'vidatop': 'Vida Top Saúde',
        'unimed': 'Unimed',
        'sulamerica': 'SulAmérica',
        'saude-caixa': 'Saúde Caixa',
        'santa-casa': 'Santa Casa Saúde Piracicaba',
        'postal-saude': 'Postal Saúde',
        'leader': 'Leader Saúde',
        'mediservice': 'MediService',
        'hapvida': 'Hapvida',
        'nossa-senhora': 'Nossa Senhora Intermédica',
        'gocare': 'GoCare Saúde',
        'geap': 'GEAP Saúde',
        'gama': 'GAMA Saúde',
        'fusex': 'FUSEX',
        'funserv': 'FUNSERV',
        'assefaz': 'Fundação ASSEFAZ',
        'economus': 'Economus',
        'cassi': 'CASSI',
        'bradesco': 'Bradesco Saúde',
        'biocentro': 'Biocentro',
        'apas': 'APAS Saúde',
        'amil': 'Amil',
        'amhemered': 'AMHEMED',
        'mais-saude': 'Mais Saúde',
        'particular': 'Particular',
        'outro': 'Outro'
      };
      
      const treatmentText = treatmentLabels[data.treatment || ''] || data.treatment || 'Não especificado';
      const insuranceText = insuranceLabels[data.insurance || ''] || data.insurance || 'Não especificado';
      
      const agora = new Date();
      const dataHora = agora.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      const mensagemWhatsApp = `🌿 *Olá, Estância Morro Grande!* 🌿

Gostaria de saber mais informações sobre os tratamentos disponíveis.

👤 *Meu nome:* ${data.name}
📞 *Telefone para contato:* ${data.phone}
💊 *Tipo de tratamento:* ${treatmentText}
🏥 *Plano de saúde:* ${insuranceText}

📅 *Solicitado em:* ${dataHora}

Aguardo retorno para agendar uma conversa. Obrigado(a)!

💚 _Mensagem enviada automaticamente pelo site_`;

      // Abrir WhatsApp automaticamente - mesmo número do botão flutuante
      const numeroWhatsApp = '5515997559520'; // Número do botão WhatsApp
      const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemWhatsApp)}`;
      
      // Abrir em nova aba
      window.open(linkWhatsApp, '_blank');
      
      toast({
        title: "Solicitação enviada!",
        description: "WhatsApp aberto para envio automático. Entraremos em contato em até 2 horas.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao enviar",
        description: "Por favor, verifique os dados e tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertLead) => {
    submitLead.mutate(data);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      if (numbers.length <= 10) {
        return numbers.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
      } else {
        return numbers.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
      }
    }
    return value;
  };

  return (
    <section 
      id="contato" 
      className="py-20 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Green overlay with opacity */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2c744c]/85 to-[#1e5233]/85"></div>
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center text-white mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">Solicite Atendimento</h2>
          <p className="text-base sm:text-lg md:text-xl opacity-90">
            Entre em contato conosco. Nossa equipe está pronta para ajudar você ou sua família.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
            <div className="mb-6">
              <Label htmlFor="name" className="text-slate-700 font-medium">
                Nome Completo *
              </Label>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="Digite seu nome completo"
                className="mt-2"
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="mb-6">
              <Label htmlFor="phone" className="text-slate-700 font-medium">
                Telefone/WhatsApp *
              </Label>
              <Input
                id="phone"
                {...form.register("phone")}
                placeholder="(11) 99999-9999"
                className="mt-2"
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  e.target.value = formatted;
                  form.setValue("phone", formatted);
                }}
              />
              {form.formState.errors.phone && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
              )}
            </div>

            <div className="mb-6">
              <Label htmlFor="treatment" className="text-slate-700 font-medium">
                Tipo de Tratamento
              </Label>
              <select
                id="treatment"
                {...form.register("treatment")}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c744c] focus:border-transparent"
              >
                <option value="">Selecione uma opção</option>
                <option value="saude-mental">Saúde Mental</option>
                <option value="dependencia-quimica">Dependência Química</option>
                <option value="ambos">Ambos</option>
                <option value="nao-sei">Não sei qual preciso</option>
              </select>
              {form.formState.errors.treatment && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.treatment.message}</p>
              )}
            </div>

            <div className="mb-6">
              <Label htmlFor="insurance" className="text-slate-700 font-medium">
                Convênio/Plano de Saúde
              </Label>
              <select
                id="insurance"
                {...form.register("insurance")}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c744c] focus:border-transparent"
              >
                <option value="">Selecione seu convênio</option>
                <option value="vivest">Vivest Funcesp</option>
                <option value="vidatop">Vida Top Saúde</option>
                <option value="unimed">Unimed</option>
                <option value="sulamerica">SulAmérica</option>
                <option value="saude-caixa">Saúde Caixa</option>
                <option value="santa-casa">Santa Casa Saúde Piracicaba</option>
                <option value="postal-saude">Postal Saúde</option>
                <option value="leader">Leader Saúde</option>
                <option value="mediservice">MediService</option>
                <option value="hapvida">Hapvida</option>
                <option value="nossa-senhora">Nossa Senhora Intermédica</option>
                <option value="gocare">GoCare Saúde</option>
                <option value="geap">GEAP Saúde</option>
                <option value="gama">GAMA Saúde</option>
                <option value="fusex">FUSEX</option>
                <option value="funserv">FUNSERV</option>
                <option value="assefaz">Fundação ASSEFAZ</option>
                <option value="economus">Economus</option>
                <option value="cassi">CASSI</option>
                <option value="bradesco">Bradesco Saúde</option>
                <option value="biocentro">Biocentro</option>
                <option value="apas">APAS Saúde</option>
                <option value="amil">Amil</option>
                <option value="amhemered">AMHEMED</option>
                <option value="mais-saude">Mais Saúde</option>
                <option value="particular">Particular</option>
                <option value="outro">Outro</option>
              </select>
              {form.formState.errors.insurance && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.insurance.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="relative w-full bg-gradient-to-r from-[#2c744c] to-[#1e5233] hover:from-[#1e5233] hover:to-[#2c744c] text-white font-varela font-black py-5 px-8 h-auto text-lg rounded-full transform hover:scale-110 transition-all duration-500 shadow-xl shadow-[#2c744c]/30 hover:shadow-2xl hover:shadow-[#2c744c]/60 group overflow-hidden"
              disabled={submitLead.isPending}
            >
              {/* Pulse animation background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full animate-pulse"></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative flex items-center justify-center">
                <div className="bg-white/20 p-1 rounded-full mr-3 group-hover:bg-white/30 transition-colors duration-300">
                  <Send className="text-white" size={20} />
                </div>
                <span className="tracking-wide">{submitLead.isPending ? "Enviando..." : "Solicitar Atendimento"}</span>
              </div>
            </Button>

            <div className="mt-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="text-secondary mr-2" size={20} />
                <span className="text-slate-600 font-medium">100% Confidencial</span>
              </div>
              <p className="text-slate-500 text-sm">
                Suas informações estão protegidas com total confidencialidade. 
                Entraremos em contato em até 2 horas.
              </p>
            </div>
          </form>

          {isSubmitted && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-green-800 font-medium">
                Obrigado! Sua solicitação foi enviada com sucesso.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
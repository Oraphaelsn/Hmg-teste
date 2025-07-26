import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/floating-labels-input";
import { FloatingLabelSelect } from "@/components/floating-labels-select";
import { Shield, Send, CheckCircle, Heart } from "lucide-react";
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
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 mb-4 fade-in-scale">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Formulário de Contato</h3>
                <p className="text-gray-600 text-sm">Preencha os dados abaixo para solicitar atendimento</p>
              </div>

              <div className="space-y-6">
                <FloatingLabelInput
                  label="Nome Completo"
                  {...form.register("name")}
                  error={form.formState.errors.name?.message}
                  className="slide-in-up"
                />

                <FloatingLabelInput
                  label="Telefone/WhatsApp"
                  {...form.register("phone")}
                  placeholder="(11) 99999-9999"
                  error={form.formState.errors.phone?.message}
                  className="slide-in-up"
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value);
                    e.target.value = formatted;
                    form.setValue("phone", formatted);
                  }}
                />

                <FloatingLabelSelect
                  label="Tipo de Tratamento"
                  {...form.register("treatment")}
                  error={form.formState.errors.treatment?.message}
                  className="slide-in-up"
                  options={[
                    { value: "saude-mental", label: "Saúde Mental" },
                    { value: "dependencia-quimica", label: "Dependência Química" },
                    { value: "ambos", label: "Ambos" },
                    { value: "nao-sei", label: "Não sei qual preciso" }
                  ]}
                />

                <FloatingLabelSelect
                  label="Convênio/Plano de Saúde"
                  {...form.register("insurance")}
                  error={form.formState.errors.insurance?.message}
                  className="slide-in-up"
                  options={[
                    { value: "vivest", label: "Vivest Funcesp" },
                    { value: "vidatop", label: "Vida Top Saúde" },
                    { value: "unimed", label: "Unimed" },
                    { value: "sulamerica", label: "SulAmérica" },
                    { value: "saude-caixa", label: "Saúde Caixa" },
                    { value: "santa-casa", label: "Santa Casa Saúde Piracicaba" },
                    { value: "postal-saude", label: "Postal Saúde" },
                    { value: "leader", label: "Leader Saúde" },
                    { value: "mediservice", label: "MediService" },
                    { value: "hapvida", label: "Hapvida" },
                    { value: "nossa-senhora", label: "Nossa Senhora Intermédica" },
                    { value: "gocare", label: "GoCare Saúde" },
                    { value: "geap", label: "GEAP Saúde" },
                    { value: "gama", label: "GAMA Saúde" },
                    { value: "fusex", label: "FUSEX" },
                    { value: "funserv", label: "FUNSERV" },
                    { value: "assefaz", label: "Fundação ASSEFAZ" },
                    { value: "economus", label: "Economus" },
                    { value: "cassi", label: "CASSI" },
                    { value: "bradesco", label: "Bradesco Saúde" },
                    { value: "biocentro", label: "Biocentro" },
                    { value: "apas", label: "APAS Saúde" },
                    { value: "amil", label: "Amil" },
                    { value: "amhemered", label: "AMHEMED" },
                    { value: "mais-saude", label: "Mais Saúde" },
                    { value: "particular", label: "Particular" },
                    { value: "outro", label: "Outro" }
                  ]}
                />
              </div>

              <Button 
                type="submit" 
                className="relative w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-4 px-8 h-auto text-lg rounded-xl transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 group overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={submitLead.isPending}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"></div>
                
                <div className="relative flex items-center justify-center space-x-3">
                  {submitLead.isPending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Solicitar Atendimento</span>
                    </>
                  )}
                </div>
              </Button>

              <div className="mt-6 text-center space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700 font-medium text-sm">100% Confidencial e Seguro</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Suas informações estão protegidas. Nossa equipe entrará em contato em até 2 horas.
                </p>
              </div>
            </form>
          </div>

          {isSubmitted && (
            <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl text-center shadow-lg fade-in-scale">
              <div className="flex items-center justify-center mb-3">
                <CheckCircle className="w-8 h-8 text-green-600 mr-2" />
                <h4 className="text-lg font-semibold text-green-800">Solicitação Enviada!</h4>
              </div>
              <p className="text-green-700 text-sm leading-relaxed">
                Obrigado! Sua solicitação foi enviada com sucesso. 
                <br />Nossa equipe entrará em contato em breve.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Send } from "lucide-react";

export default function ContactForm() {
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
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Solicitação enviada!",
        description: "Entraremos em contato em até 2 horas. Obrigado por confiar na Estância Morro Grande.",
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
    <section id="contato" className="py-20 gradient-brand-bg">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center text-white mb-12">
          <h2 className="text-4xl font-bold mb-6 text-white">Solicite Atendimento</h2>
          <p className="text-xl opacity-90">
            Entre em contato conosco. Nossa equipe está pronta para ajudar você ou sua família.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-xl">
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
              <Select onValueChange={(value) => form.setValue("treatment", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saude-mental">Saúde Mental</SelectItem>
                  <SelectItem value="dependencia-quimica">Dependência Química</SelectItem>
                  <SelectItem value="ambos">Ambos</SelectItem>
                  <SelectItem value="nao-sei">Não sei qual preciso</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <Label htmlFor="insurance" className="text-slate-700 font-medium">
                Convênio/Plano de Saúde
              </Label>
              <Select onValueChange={(value) => form.setValue("insurance", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione seu convênio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vivest">Vivest Funcesp</SelectItem>
                  <SelectItem value="vidatop">Vida Top Saúde</SelectItem>
                  <SelectItem value="unimed">Unimed</SelectItem>
                  <SelectItem value="sulamerica">SulAmérica</SelectItem>
                  <SelectItem value="saude-caixa">Saúde Caixa</SelectItem>
                  <SelectItem value="santa-casa">Santa Casa Saúde Piracicaba</SelectItem>
                  <SelectItem value="postal-saude">Postal Saúde</SelectItem>
                  <SelectItem value="leader">Leader Saúde</SelectItem>
                  <SelectItem value="mediservice">MediService</SelectItem>
                  <SelectItem value="hapvida">Hapvida</SelectItem>
                  <SelectItem value="nossa-senhora">Nossa Senhora Intermédica</SelectItem>
                  <SelectItem value="gocare">GoCare Saúde</SelectItem>
                  <SelectItem value="geap">GEAP Saúde</SelectItem>
                  <SelectItem value="gama">GAMA Saúde</SelectItem>
                  <SelectItem value="fusex">FUSEX</SelectItem>
                  <SelectItem value="funserv">FUNSERV</SelectItem>
                  <SelectItem value="assefaz">Fundação ASSEFAZ</SelectItem>
                  <SelectItem value="economus">Economus</SelectItem>
                  <SelectItem value="cassi">CASSI</SelectItem>
                  <SelectItem value="bradesco">Bradesco Saúde</SelectItem>
                  <SelectItem value="biocentro">Biocentro</SelectItem>
                  <SelectItem value="apas">APAS Saúde</SelectItem>
                  <SelectItem value="amil">Amil</SelectItem>
                  <SelectItem value="amhemered">AMHEMED</SelectItem>
                  <SelectItem value="mais-saude">Mais Saúde</SelectItem>
                  <SelectItem value="particular">Particular</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
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
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Phone, User, Calendar, FileText, Shield } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import logoImage from "@assets/Estância Morro Grande Branco_1752989297686.png";

interface Lead {
  id: number;
  name: string;
  phone: string;
  treatment?: string;
  insurance?: string;
  createdAt: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Senha simples para acesso (você pode alterar)
  const ADMIN_PASSWORD = "estancia2025";

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Senha incorreta!");
    }
  };

  const { data: leads = [], isLoading, refetch } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
    enabled: isAuthenticated,
    refetchInterval: 30000, // Atualiza a cada 30 segundos
  });

  const getTreatmentBadge = (treatment?: string) => {
    const variants = {
      "saude-mental": "bg-blue-100 text-blue-800",
      "dependencia-quimica": "bg-orange-100 text-orange-800", 
      "ambos": "bg-purple-100 text-purple-800",
      "nao-sei": "bg-gray-100 text-gray-800"
    };
    
    const labels = {
      "saude-mental": "Saúde Mental",
      "dependencia-quimica": "Dependência Química",
      "ambos": "Ambos",
      "nao-sei": "Não sei qual preciso"
    };

    if (!treatment) return null;
    
    return (
      <Badge className={variants[treatment as keyof typeof variants] || "bg-gray-100 text-gray-800"}>
        {labels[treatment as keyof typeof labels] || treatment}
      </Badge>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-[#2c744c]/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <img 
                src={logoImage} 
                alt="Estância Morro Grande" 
                className="w-20 h-16 object-contain mx-auto filter brightness-0 invert cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:drop-shadow-xl"
                onClick={() => window.location.href = "/"}
              />
            </div>
            <CardTitle className="text-2xl font-bold text-[#2c744c]">
              Painel Administrativo
            </CardTitle>
            <p className="text-gray-600">
              Estância Morro Grande - Gestão de Leads
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite a senha de acesso"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <Button 
                onClick={handleLogin}
                className="w-full bg-[#2c744c] hover:bg-[#1e5233]"
              >
                Acessar Painel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-[#2c744c]/10 p-4">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-[#2c744c]/10 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2c744c] mb-2">
              Painel de Leads
            </h1>
            <p className="text-gray-600">
              Estância Morro Grande - {leads.length} leads recebidos
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => refetch()}
              variant="outline"
              className="border-[#2c744c] text-[#2c744c] hover:bg-[#2c744c] hover:text-white"
            >
              Atualizar
            </Button>
            <Button 
              onClick={() => setIsAuthenticated(false)}
              variant="destructive"
            >
              Sair
            </Button>
          </div>
        </div>

        {leads.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-gray-500">
                <FileText className="mx-auto mb-4" size={48} />
                <h3 className="text-lg font-medium mb-2">Nenhum lead ainda</h3>
                <p>Os formulários enviados aparecerão aqui automaticamente.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {leads.map((lead) => (
              <Card key={lead.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#2c744c]/10 rounded-full flex items-center justify-center">
                        <User className="text-[#2c744c]" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {lead.name}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={14} />
                          <span className="text-sm">
                            {formatDistanceToNow(new Date(lead.createdAt), { 
                              addSuffix: true, 
                              locale: ptBR 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    {lead.treatment && getTreatmentBadge(lead.treatment)}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Phone className="text-[#2c744c]" size={16} />
                      <div>
                        <p className="text-sm text-gray-600">Telefone/WhatsApp</p>
                        <p className="font-medium">
                          <a 
                            href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#2c744c] hover:underline"
                          >
                            {lead.phone}
                          </a>
                        </p>
                      </div>
                    </div>

                    {lead.insurance && (
                      <div className="flex items-center gap-3">
                        <Shield className="text-[#2c744c]" size={16} />
                        <div>
                          <p className="text-sm text-gray-600">Plano de Saúde</p>
                          <p className="font-medium">{lead.insurance}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
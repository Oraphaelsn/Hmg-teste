import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Phone, User, Calendar, FileText, Shield, Search, Filter, Download, Clock } from "lucide-react";
import { format, formatDistanceToNow, isAfter, isBefore, startOfDay, endOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import logoOficial from "@assets/Estância Morro Grande Branco_1752992752131.png";

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
  
  // Filtros e busca
  const [searchTerm, setSearchTerm] = useState("");
  const [treatmentFilter, setTreatmentFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

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

  // Filtros aplicados aos leads
  const filteredLeads = useMemo(() => {
    let filtered = [...leads];

    // Busca por nome ou telefone
    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm)
      );
    }

    // Filtro por tratamento
    if (treatmentFilter !== "all") {
      filtered = filtered.filter(lead => lead.treatment === treatmentFilter);
    }

    // Filtro por data
    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date();
      
      filtered = filtered.filter(lead => {
        const leadDate = new Date(lead.createdAt);
        
        switch (dateFilter) {
          case "today":
            return format(leadDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
          case "yesterday":
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            return format(leadDate, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd');
          case "week":
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return isAfter(leadDate, weekAgo);
          case "month":
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return isAfter(leadDate, monthAgo);
          default:
            return true;
        }
      });
    }

    // Ordenação
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      
      switch (sortBy) {
        case "newest":
          return dateB - dateA;
        case "oldest":
          return dateA - dateB;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return dateB - dateA;
      }
    });

    return filtered;
  }, [leads, searchTerm, treatmentFilter, dateFilter, sortBy]);

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

  const exportToCSV = () => {
    const csvContent = [
      ["Nome", "Telefone", "Tratamento", "Convênio", "Data/Hora"],
      ...filteredLeads.map(lead => [
        lead.name,
        lead.phone,
        lead.treatment || "Não informado",
        lead.insurance || "Não informado",
        format(new Date(lead.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `leads-estancia-${format(new Date(), "dd-MM-yyyy")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-[#2c744c]/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <img 
                src={logoOficial} 
                alt="Estância Morro Grande" 
                className="h-16 w-auto mx-auto object-contain cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:drop-shadow-xl filter brightness-0 invert-0"
                style={{ filter: 'brightness(0) saturate(100%) invert(28%) sepia(39%) saturate(1276%) hue-rotate(96deg) brightness(93%) contrast(89%)' }}
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={logoOficial} 
                alt="Estância Morro Grande" 
                className="h-12 w-auto object-contain cursor-pointer transition-all duration-300 hover:scale-110"
                style={{ filter: 'brightness(0) saturate(100%) invert(28%) sepia(39%) saturate(1276%) hue-rotate(96deg) brightness(93%) contrast(89%)' }}
                onClick={() => window.location.href = "/"}
              />
              <div>
                <h1 className="text-2xl font-bold text-[#2c744c]">Painel Administrativo</h1>
                <p className="text-gray-600">Gestão de Leads - Estância Morro Grande</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={exportToCSV}
                variant="outline"
                className="flex items-center space-x-2"
                disabled={filteredLeads.length === 0}
              >
                <Download size={16} />
                <span>Exportar CSV</span>
              </Button>
              <Button 
                onClick={() => setIsAuthenticated(false)}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Shield size={16} />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Buscar por nome ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtro por Tratamento */}
            <Select value={treatmentFilter} onValueChange={setTreatmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por tratamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tratamentos</SelectItem>
                <SelectItem value="saude-mental">Saúde Mental</SelectItem>
                <SelectItem value="dependencia-quimica">Dependência Química</SelectItem>
                <SelectItem value="ambos">Ambos</SelectItem>
                <SelectItem value="nao-sei">Não sei qual preciso</SelectItem>
              </SelectContent>
            </Select>

            {/* Filtro por Data */}
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por data" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as datas</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="yesterday">Ontem</SelectItem>
                <SelectItem value="week">Última semana</SelectItem>
                <SelectItem value="month">Último mês</SelectItem>
              </SelectContent>
            </Select>

            {/* Ordenação */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mais recentes</SelectItem>
                <SelectItem value="oldest">Mais antigos</SelectItem>
                <SelectItem value="name">Nome (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#2c744c]/10 rounded-lg">
                  <User className="text-[#2c744c]" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total de Leads</p>
                  <p className="text-2xl font-bold text-[#2c744c]">{leads.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Filter className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Filtrados</p>
                  <p className="text-2xl font-bold text-blue-600">{filteredLeads.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Último Lead</p>
                  <p className="text-sm font-medium text-green-600">
                    {leads.length > 0 ? formatDistanceToNow(new Date(leads[0].createdAt), { addSuffix: true, locale: ptBR }) : "Nenhum"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Leads */}
        {filteredLeads.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-gray-500">
                <FileText className="mx-auto mb-4" size={48} />
                <h3 className="text-lg font-medium mb-2">
                  {leads.length === 0 ? "Nenhum lead ainda" : "Nenhum lead encontrado"}
                </h3>
                <p>
                  {leads.length === 0 
                    ? "Os formulários enviados aparecerão aqui automaticamente." 
                    : "Tente ajustar os filtros para ver mais resultados."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredLeads.map((lead) => (
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
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{format(new Date(lead.createdAt), "dd/MM/yyyy", { locale: ptBR })}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{format(new Date(lead.createdAt), "HH:mm", { locale: ptBR })}</span>
                          </div>
                          <span className="text-xs text-gray-400">
                            ({formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true, locale: ptBR })})
                          </span>
                        </div>
                      </div>
                    </div>
                    {lead.treatment && getTreatmentBadge(lead.treatment)}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
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

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">ID: #{lead.id}</span>
                      <Button
                        size="sm"
                        className="bg-[#2c744c] hover:bg-[#1e5233] text-white"
                        onClick={() => window.open(`https://wa.me/55${lead.phone.replace(/\D/g, '')}?text=Olá ${lead.name}, somos da Estância Morro Grande. Como podemos ajudá-lo?`, '_blank')}
                      >
                        Contatar via WhatsApp
                      </Button>
                    </div>
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
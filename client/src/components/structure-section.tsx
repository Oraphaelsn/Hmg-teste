import { Clock, Users, Shield, Heart, Brain } from "lucide-react";
import corpoClinicoImage from "@assets/ChatGPT Image 20 de jul. de 2025, 02_43_08_1752992995219.png";

const facilities = [
  {
    image: "https://estanciamorrogrande.com.br/wp-content/uploads/2023/05/06.jpg",
    title: "Atividades terapeuticas"
  },
  {
    image: "https://estanciamorrogrande.com.br/wp-content/uploads/2021/04/estancia_morro-grande_estrutura7.jpg",
    title: "Áreas de Convivência"
  },
  {
    image: "https://estanciamorrogrande.com.br/wp-content/uploads/2021/04/estancia_morro-grande_estrutura13.jpg",
    title: "Quartos"
  },
  {
    image: "https://estanciamorrogrande.com.br/wp-content/uploads/2023/05/01.jpg",
    title: "Academia"
  },
  {
    image: "https://estanciamorrogrande.com.br/wp-content/uploads/2021/04/estancia_morro-grande_estrutura34.jpg",
    title: "Restaurante"
  },
  {
    image: corpoClinicoImage,
    title: "Corpo Clínico"
  }
];

const differentials = [
  {
    icon: Clock,
    title: "Atendimento 24h",
    description: "Equipe disponível em tempo integral para qualquer necessidade",
    color: "primary"
  },
  {
    icon: Users,
    title: "Equipe Especializada",
    description: "Profissionais qualificados em enfermagem e monitoria",
    color: "secondary"
  },
  {
    icon: Shield,
    title: "Privacidade Total",
    description: "Ambiente seguro com total confidencialidade e empatia",
    color: "accent"
  },
  {
    icon: Heart,
    title: "Cuidado Humanizado",
    description: "Planos personalizados e atendimento humanizado",
    color: "primary"
  },
  {
    icon: Brain,
    title: "Tratamento Multimodal",
    description: "Abordagem integrada combinando múltiplas terapias especializadas",
    color: "secondary"
  }
];

export default function StructureSection() {
  return (
    <section id="estrutura" className="py-12 sm:py-16 md:py-20 bg-slate-50">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-green mb-4 sm:mb-6">Nossa Estrutura</h2>
          <p className="text-lg sm:text-xl md:text-2xl text-brand-green font-medium mb-6 sm:mb-8">
            "Ambiente seguro, supervisionado e preparado para recomeços"
          </p>
        </div>

        {/* Galeria de Fotos */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-16">
          {facilities.map((facility, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src={facility.image}
                alt={facility.title}
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <h4 className="font-semibold text-slate-800">{facility.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Diferenciais */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-green mb-6 sm:mb-8 text-center">Nossos Diferenciais</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {differentials.map((differential, index) => {
              const IconComponent = differential.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-${differential.color}/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 hover:scale-105 transition-all duration-300 hover:shadow-lg`}>
                    <IconComponent className={`text-${differential.color} hover:scale-110 transition-transform duration-300`} size={28} style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))' }} />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">{differential.title}</h4>
                  <p className="text-slate-600 text-xs sm:text-sm">{differential.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

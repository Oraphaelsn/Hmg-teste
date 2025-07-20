import { Clock, Users, Shield, Heart } from "lucide-react";

const facilities = [
  {
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Salas de Terapia"
  },
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Áreas de Convivência"
  },
  {
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Quartos Confortáveis"
  },
  {
    image: "https://images.unsplash.com/photo-1469022563428-aa04fef9f5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Jardins Terapêuticos"
  },
  {
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Consultórios Médicos"
  },
  {
    image: "https://images.unsplash.com/photo-1599045118108-bf9954418b76?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Terapia em Grupo"
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
  }
];

export default function StructureSection() {
  return (
    <section id="estrutura" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-6">Nossa Estrutura</h2>
          <p className="text-2xl text-accent font-medium mb-8">
            "Ambiente seguro, supervisionado e preparado para recomeços"
          </p>
        </div>

        {/* Galeria de Fotos */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {facilities.map((facility, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src={facility.image}
                alt={facility.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <h4 className="font-semibold text-slate-800">{facility.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Diferenciais */}
        <div className="bg-white rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">Nossos Diferenciais</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentials.map((differential, index) => {
              const IconComponent = differential.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 bg-${differential.color}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`text-${differential.color}`} size={32} />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">{differential.title}</h4>
                  <p className="text-slate-600 text-sm">{differential.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

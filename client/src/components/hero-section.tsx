import { Button } from "@/components/ui/button";
import { UserCheck } from "lucide-react";

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="inicio" className="pt-20 relative min-h-screen flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source 
            src="https://estanciamorrogrande.com.br/wp-content/uploads/2023/10/Slider-WEBM-1080.webm" 
            type="video/webm"
          />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 to-brand-green/75" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-white">
        <div className="max-w-6xl mx-auto fade-in">
          {/* Highlight Badge */}
          <div className="text-center mb-6">
            <span className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 text-xs font-bold tracking-wider text-white/95 animate-pulse uppercase">
              RECUPERAR É POSSÍVEL
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-center font-varela text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-shadow-strong">
            Você não está sozinho
          </h1>
          
          {/* Subtitle */}
          <p className="text-center text-xl md:text-2xl lg:text-3xl mb-6 font-varela font-medium text-white/95 text-shadow leading-snug">
            Recuperar é possível com acolhimento, dignidade e segurança
          </p>

          {/* Description */}
          <div className="max-w-4xl mx-auto text-center mb-10">
            <p className="text-lg md:text-xl leading-relaxed text-white/90 font-light px-4">
              Na Estância Morro Grande, oferecemos tratamento humanizado e especializado para dependência química e saúde mental, com ambiente seguro e equipe 24h.
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <div className="inline-flex flex-col items-center space-y-3">
              <p className="text-white/80 text-sm font-light">
                Atendimento 24 horas • Primeira consulta gratuita
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
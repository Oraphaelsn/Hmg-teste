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
        <div className="max-w-6xl mx-auto fade-in min-h-screen flex items-center justify-center">
          {/* Conteúdo centralizado e minimalista */}
        </div>
      </div>

      {/* Centralized CTA Button with info text - Fixed only on hero section */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-3">
        <Button 
          onClick={scrollToContact}
          size="lg"
          className="bg-white text-brand-green hover:bg-slate-50 font-varela font-bold px-8 py-4 h-auto text-lg rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/20"
        >
          <UserCheck className="mr-2" size={20} />
          Fale com um Especialista
        </Button>
        <p className="text-white/80 text-sm font-light text-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
          • Atendimento 24 horas •
        </p>
      </div>
    </section>
  );
}
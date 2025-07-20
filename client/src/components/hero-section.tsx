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
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-3">
        <Button 
          onClick={scrollToContact}
          size="lg"
          className="relative bg-gradient-to-r from-[#2c744c] to-[#1e5233] hover:from-[#1e5233] hover:to-[#2c744c] text-white font-varela font-black px-10 py-5 h-auto text-xl rounded-full transform hover:scale-110 transition-all duration-500 shadow-xl shadow-[#2c744c]/30 hover:shadow-2xl hover:shadow-[#2c744c]/60 group overflow-hidden"
        >
          {/* Pulse animation background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full animate-pulse"></div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <div className="relative flex items-center justify-center">
            <div className="bg-white/20 p-1 rounded-full mr-3 group-hover:bg-white/30 transition-colors duration-300">
              <UserCheck className="text-white" size={24} />
            </div>
            <span className="tracking-wide">Fale com um Especialista</span>
          </div>
        </Button>
        <div className="relative">
          <p className="text-white/90 text-sm font-medium text-center bg-gradient-to-r from-black/40 to-slate-900/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-lg">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Atendimento 24 horas
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full ml-2 animate-pulse"></span>
          </p>
        </div>
      </div>
    </section>
  );
}
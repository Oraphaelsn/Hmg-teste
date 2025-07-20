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
    <section id="inicio" className="hero-section pt-20 relative min-h-screen flex items-center justify-center">
      {/* High-Quality Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full hero-video filter brightness-110 contrast-105 saturate-110"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          style={{
            filter: 'brightness(1.1) contrast(1.05) saturate(1.1) hue-rotate(5deg)'
          }}
        >
          {/* Multiple sources for better quality and compatibility */}
          <source 
            src="https://estanciamorrogrande.com.br/wp-content/uploads/2023/10/Slider-WEBM-1080.webm" 
            type="video/webm"
          />
          <source 
            src="https://estanciamorrogrande.com.br/wp-content/uploads/2023/10/Slider-MP4-1080.mp4" 
            type="video/mp4"
          />
        </video>
        {/* Professional overlay with subtle gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-transparent to-[#2c744c]/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        
        {/* Subtle vignette effect for cinematic quality */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30" />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 lg:px-8 text-white">
        <div className="max-w-6xl mx-auto fade-in min-h-screen flex items-center justify-center">
          {/* Conteúdo centralizado e minimalista */}
        </div>
      </div>

      {/* Centralized CTA Button with info text - Fixed only on hero section */}
      <div className="absolute bottom-20 sm:bottom-24 md:bottom-28 lg:bottom-32 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-2 sm:space-y-3 px-4">
        <Button 
          onClick={scrollToContact}
          size="lg"
          className="relative bg-gradient-to-r from-[#2c744c] to-[#1e5233] hover:from-[#1e5233] hover:to-[#2c744c] text-white font-varela font-black px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-5 h-auto text-base sm:text-lg md:text-xl rounded-full transform hover:scale-110 transition-all duration-500 shadow-xl shadow-[#2c744c]/30 hover:shadow-2xl hover:shadow-[#2c744c]/60 group overflow-hidden w-auto max-w-xs sm:max-w-sm"
        >
          {/* Pulse animation background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full animate-pulse"></div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <div className="relative flex items-center justify-center">
            <div className="bg-white/20 p-1 rounded-full mr-2 sm:mr-3 group-hover:bg-white/30 transition-colors duration-300">
              <UserCheck className="text-white" size={18} />
            </div>
            <span className="tracking-wide">Solicitar Orientação</span>
          </div>
        </Button>
        <div className="relative">
          <p className="text-white/90 text-xs sm:text-sm font-medium text-center bg-gradient-to-r from-black/40 to-slate-900/40 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/20 shadow-lg">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Atendimento 24 horas
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full ml-2 animate-pulse"></span>
          </p>
        </div>
      </div>
    </section>
  );
}
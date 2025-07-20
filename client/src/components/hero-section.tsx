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
    </section>
  );
}
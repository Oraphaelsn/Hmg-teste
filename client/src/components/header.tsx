import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import logoImage from "@assets/Estância Morro Grande Branco_1752989297686.png";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-[#2c744c] to-[#1e5233] shadow-2xl shadow-[#2c744c]/50 border-b-4 border-gradient-to-r border-emerald-400/30">
      {/* Elegant decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-300/60 via-white/40 to-emerald-300/60"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-200/80 to-transparent"></div>
      
      {/* Pulse animation background */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse"></div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
      
      <nav className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <img 
                src={logoImage} 
                alt="Estância Morro Grande" 
                className="w-24 h-16 object-contain drop-shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 group-hover:drop-shadow-2xl group-hover:brightness-110 filter contrast-125"
              />
            </div>
            <div className="flex flex-col relative">
              {/* Text container with subtle styling */}
              <div className="relative bg-gradient-to-r from-white/5 to-transparent px-2 py-0.5 rounded-md border border-white/15 group-hover:border-emerald-300/30 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-emerald-600/10 group-hover:to-transparent">
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-800 rounded-md"></div>
                
                <span className="text-xl font-black text-white font-varela tracking-wide relative z-10 drop-shadow-md group-hover:text-emerald-50 transition-colors duration-300">
                  Estância Morro Grande
                  {/* Subtle underline effect */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-300 to-white group-hover:w-full transition-all duration-400"></div>
                </span>
                <span className="text-xs text-white/90 font-medium -mt-1 relative z-10 drop-shadow-sm group-hover:text-emerald-100 transition-colors duration-300">
                  Cuidado Especializado
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <button 
              onClick={() => scrollToSection("inicio")}
              className="relative px-4 py-2 text-white font-semibold rounded-lg group overflow-hidden transition-all duration-300 hover:bg-white/20"
            >
              <span className="relative z-10">Início</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></div>
            </button>
            <button 
              onClick={() => scrollToSection("tratamentos")}
              className="relative px-4 py-2 text-white font-semibold rounded-lg group overflow-hidden transition-all duration-300 hover:bg-white/20"
            >
              <span className="relative z-10">Tratamentos</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></div>
            </button>
            <button 
              onClick={() => scrollToSection("estrutura")}
              className="relative px-4 py-2 text-white font-semibold rounded-lg group overflow-hidden transition-all duration-300 hover:bg-white/20"
            >
              <span className="relative z-10">Estrutura</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></div>
            </button>
            <button 
              onClick={() => scrollToSection("depoimentos")}
              className="relative px-4 py-2 text-white font-semibold rounded-lg group overflow-hidden transition-all duration-300 hover:bg-white/20"
            >
              <span className="relative z-10">Depoimentos</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></div>
            </button>
            <button 
              onClick={() => scrollToSection("contato")}
              className="relative px-4 py-2 ml-4 bg-gradient-to-r from-[#2c744c] to-[#1e5233] hover:from-[#1e5233] hover:to-[#2c744c] text-white font-black rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-900/40 hover:shadow-emerald-500/60 group overflow-hidden border border-white/40 hover:border-emerald-300/70"
            >
              {/* Subtle background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/8 to-transparent rounded-full"></div>
              
              {/* Simple shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-800"></div>
              
              <div className="relative flex items-center justify-center z-10">
                {/* WhatsApp icon - always visible with original colors */}
                <div className="bg-[#25D366] p-1 rounded-full mr-2 group-hover:bg-[#128C7E] transition-all duration-300 shadow-lg border border-white/30 group-hover:animate-bounce">
                  <FaWhatsapp className="text-white drop-shadow-sm" size={16} />
                </div>
                
                <span className="tracking-wide text-sm font-varela drop-shadow-sm group-hover:text-emerald-50 transition-colors duration-300">Contato</span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/20 rounded-xl border border-white/30 hover:border-white/50 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/30 bg-gradient-to-b from-[#2c744c] to-[#1e5233]">
            <div className="px-4 py-4 space-y-2">
              <button 
                onClick={() => scrollToSection("inicio")}
                className="block w-full text-left px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-all duration-300 font-semibold"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection("tratamentos")}
                className="block w-full text-left px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-all duration-300 font-semibold"
              >
                Tratamentos
              </button>
              <button 
                onClick={() => scrollToSection("estrutura")}
                className="block w-full text-left px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-all duration-300 font-semibold"
              >
                Estrutura
              </button>
              <button 
                onClick={() => scrollToSection("depoimentos")}
                className="block w-full text-left px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-all duration-300 font-semibold"
              >
                Depoimentos
              </button>
              <button 
                onClick={() => scrollToSection("contato")}
                className="relative block w-full text-left px-4 py-2.5 bg-gradient-to-r from-[#2c744c] to-[#1e5233] hover:from-[#1e5233] hover:to-[#2c744c] text-white font-black rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-900/40 hover:shadow-emerald-500/60 group overflow-hidden mt-2 border border-white/30 hover:border-emerald-300/60"
              >
                {/* Subtle background */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/8 to-transparent rounded-lg"></div>
                
                {/* Simple shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-800"></div>
                
                <div className="relative flex items-center z-10">
                  {/* WhatsApp icon - always visible with original colors */}
                  <div className="bg-[#25D366] p-1 rounded-full mr-2 group-hover:bg-[#128C7E] transition-all duration-300 shadow-lg border border-white/30 group-hover:animate-bounce">
                    <FaWhatsapp className="text-white drop-shadow-sm" size={16} />
                  </div>
                  
                  <span className="tracking-wide text-sm font-varela drop-shadow-sm group-hover:text-emerald-50 transition-colors duration-300">Contato</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

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
    <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-[#2c744c] to-[#1e5233] shadow-2xl shadow-[#2c744c]/50 border-b-2 border-white/20">
      {/* Pulse animation background */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse"></div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
      
      <nav className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shadow-lg shadow-black/30 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-105">
              {/* Shine effect on logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></div>
              <Heart className="text-white relative z-10" size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white font-varela tracking-wide">Estância Morro Grande</span>
              <span className="text-xs text-white/90 font-medium -mt-1">Cuidado Especializado</span>
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
              className="relative px-6 py-3 ml-4 bg-gradient-to-r from-[#2c744c] to-[#1e5233] hover:from-[#1e5233] hover:to-[#2c744c] text-white font-black rounded-full transform hover:scale-110 transition-all duration-500 shadow-xl shadow-[#2c744c]/30 hover:shadow-2xl hover:shadow-[#2c744c]/60 group overflow-hidden"
            >
              {/* Pulse animation background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full animate-pulse"></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative flex items-center justify-center">
                {/* Default icon - appears initially */}
                <div className="bg-white/20 p-1 rounded-full mr-2 group-hover:bg-white/30 transition-colors duration-300 group-hover:hidden">
                  <MessageCircle className="text-white" size={18} />
                </div>
                
                {/* WhatsApp icon - appears on hover */}
                <div className="bg-white/20 p-1 rounded-full mr-2 group-hover:bg-green-500 transition-all duration-300 hidden group-hover:block animate-bounce">
                  <FaWhatsapp className="text-white" size={18} />
                </div>
                
                <span className="tracking-wide text-sm font-varela">Contato</span>
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
                className="relative block w-full text-left px-4 py-3 bg-gradient-to-r from-[#2c744c] to-[#1e5233] hover:from-[#1e5233] hover:to-[#2c744c] text-white font-black rounded-lg transform hover:scale-105 transition-all duration-500 shadow-xl shadow-[#2c744c]/30 hover:shadow-2xl hover:shadow-[#2c744c]/60 group overflow-hidden mt-2"
              >
                {/* Pulse animation background */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-lg animate-pulse"></div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative flex items-center">
                  {/* Default icon - appears initially */}
                  <div className="bg-white/20 p-1 rounded-full mr-2 group-hover:bg-white/30 transition-colors duration-300 group-hover:hidden">
                    <MessageCircle className="text-white" size={18} />
                  </div>
                  
                  {/* WhatsApp icon - appears on hover */}
                  <div className="bg-white/20 p-1 rounded-full mr-2 group-hover:bg-green-500 transition-all duration-300 hidden group-hover:block animate-bounce">
                    <FaWhatsapp className="text-white" size={18} />
                  </div>
                  
                  <span className="tracking-wide font-varela">Contato</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

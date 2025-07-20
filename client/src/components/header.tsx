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
            <div className="relative w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 rounded-xl flex items-center justify-center shadow-2xl shadow-emerald-900/50 group-hover:shadow-emerald-400/30 transition-all duration-500 group-hover:scale-110 border-2 border-white/40 group-hover:border-white/60">
              {/* Multiple layered shine effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-xl animate-pulse"></div>
              
              {/* Outer glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/20 to-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <Heart className="text-white relative z-10 drop-shadow-lg" size={22} />
            </div>
            <div className="flex flex-col relative">
              {/* Text background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-transparent blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-lg"></div>
              
              <span className="text-xl font-black text-white font-varela tracking-wide relative z-10 drop-shadow-2xl group-hover:text-emerald-50 transition-colors duration-300">
                Estância Morro Grande
                {/* Underline effect */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-300 to-white group-hover:w-full transition-all duration-500"></div>
              </span>
              <span className="text-xs text-white/90 font-medium -mt-1 relative z-10 drop-shadow-lg group-hover:text-emerald-100 transition-colors duration-300">
                Cuidado Especializado
              </span>
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
              className="relative px-6 py-3 ml-4 bg-gradient-to-r from-[#2c744c] via-emerald-600 to-[#1e5233] hover:from-[#1e5233] hover:via-emerald-500 hover:to-[#2c744c] text-white font-black rounded-full transform hover:scale-115 transition-all duration-500 shadow-2xl shadow-emerald-900/60 hover:shadow-emerald-400/80 group overflow-hidden border-3 border-white/50 hover:border-emerald-300/80"
            >
              {/* Multiple layered backgrounds for depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-emerald-200/20 to-transparent rounded-full animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 to-transparent rounded-full"></div>
              
              {/* Enhanced shine effect with multiple layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent transform skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1200"></div>
              
              {/* Outer glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/30 to-white/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110"></div>
              
              {/* Inner border glow */}
              <div className="absolute inset-1 rounded-full border border-white/30 group-hover:border-emerald-200/60 transition-colors duration-500"></div>
              
              <div className="relative flex items-center justify-center z-10">
                {/* Default icon - appears initially */}
                <div className="bg-white/30 p-1.5 rounded-full mr-2 group-hover:bg-white/40 transition-colors duration-300 group-hover:hidden shadow-lg border border-white/20">
                  <MessageCircle className="text-white drop-shadow-lg" size={18} />
                </div>
                
                {/* WhatsApp icon - appears on hover */}
                <div className="bg-green-500 p-1.5 rounded-full mr-2 group-hover:bg-green-400 transition-all duration-300 hidden group-hover:block animate-bounce shadow-xl border-2 border-white/40">
                  <FaWhatsapp className="text-white drop-shadow-lg" size={18} />
                </div>
                
                <span className="tracking-wide text-sm font-varela drop-shadow-lg group-hover:text-emerald-50 transition-colors duration-300">Contato</span>
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
                className="relative block w-full text-left px-4 py-3 bg-gradient-to-r from-[#2c744c] via-emerald-600 to-[#1e5233] hover:from-[#1e5233] hover:via-emerald-500 hover:to-[#2c744c] text-white font-black rounded-lg transform hover:scale-105 transition-all duration-500 shadow-2xl shadow-emerald-900/60 hover:shadow-emerald-400/80 group overflow-hidden mt-2 border-2 border-white/40 hover:border-emerald-300/70"
              >
                {/* Multiple layered backgrounds for depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-emerald-200/20 to-transparent rounded-lg animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 to-transparent rounded-lg"></div>
                
                {/* Enhanced shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent transform skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1200"></div>
                
                {/* Outer glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400/30 to-white/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex items-center z-10">
                  {/* Default icon - appears initially */}
                  <div className="bg-white/30 p-1.5 rounded-full mr-2 group-hover:bg-white/40 transition-colors duration-300 group-hover:hidden shadow-lg border border-white/20">
                    <MessageCircle className="text-white drop-shadow-lg" size={18} />
                  </div>
                  
                  {/* WhatsApp icon - appears on hover */}
                  <div className="bg-green-500 p-1.5 rounded-full mr-2 group-hover:bg-green-400 transition-all duration-300 hidden group-hover:block animate-bounce shadow-xl border-2 border-white/40">
                    <FaWhatsapp className="text-white drop-shadow-lg" size={18} />
                  </div>
                  
                  <span className="tracking-wide font-varela drop-shadow-lg group-hover:text-emerald-50 transition-colors duration-300">Contato</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

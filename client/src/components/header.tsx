import { FaWhatsapp } from "react-icons/fa";
import logoOficial from "@assets/Estância Morro Grande Branco_1752992752131.png";

export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 overflow-hidden">
      {/* Container principal com efeito de onda na direita */}
      <div className="relative bg-gradient-to-r from-[#2c744c] to-[#1e5233] shadow-2xl shadow-[#2c744c]/30">
        {/* Efeito de onda SVG no lado direito */}
        <div className="absolute right-0 top-0 bottom-0 w-16 overflow-hidden">
          <svg 
            className="absolute right-0 top-0 h-full w-full" 
            viewBox="0 0 64 80" 
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Onda principal */}
            <path 
              d="M0 0 Q16 15 32 0 Q48 -15 64 0 L64 80 Q48 65 32 80 Q16 95 0 80 Z" 
              fill="url(#waveGradient)"
              className="drop-shadow-lg"
            />
            {/* Onda secundária para profundidade */}
            <path 
              d="M8 5 Q20 18 36 5 Q52 -8 64 5 L64 75 Q52 62 36 75 Q20 88 8 75 Z" 
              fill="url(#waveGradient2)"
              opacity="0.6"
            />
            
            {/* Gradientes para as ondas */}
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e5233" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#2c744c" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.3"/>
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#065f46" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Soft edge shadows */}
        <div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-b from-black/20 to-transparent blur-sm"></div>
        <div className="absolute -left-2 top-0 bottom-0 w-2 bg-gradient-to-r from-black/15 to-transparent blur-sm"></div>
        
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
        
        <nav className="container mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-14 sm:h-20">
          {/* Logo */}
          <div 
            className="flex items-center group cursor-pointer"
            onClick={() => {
              const element = document.getElementById("inicio");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            <div className="relative">
              <img 
                src={logoOficial} 
                alt="Estância Morro Grande" 
                className="w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-16 object-contain drop-shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 filter contrast-125"
              />
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

          {/* Mobile Navigation - Horizontal layout with contact button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile menu items on the right */}
            <div className="flex items-center space-x-1 text-xs">
              <button 
                onClick={() => scrollToSection("inicio")}
                className="px-2 py-1 text-white/90 hover:text-white font-medium transition-colors duration-300"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection("tratamentos")}
                className="px-2 py-1 text-white/90 hover:text-white font-medium transition-colors duration-300"
              >
                Tratamentos
              </button>
              <button 
                onClick={() => scrollToSection("estrutura")}
                className="px-2 py-1 text-white/90 hover:text-white font-medium transition-colors duration-300"
              >
                Estrutura
              </button>
              <button 
                onClick={() => scrollToSection("depoimentos")}
                className="px-2 py-1 text-white/90 hover:text-white font-medium transition-colors duration-300"
              >
                Depoimentos
              </button>
            </div>
            
            {/* Contact button */}
            <button 
              onClick={() => scrollToSection("contato")}
              className="relative px-3 py-1.5 bg-gradient-to-r from-[#2c744c] to-[#1e5233] hover:from-[#1e5233] hover:to-[#2c744c] text-white font-black rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-900/40 hover:shadow-emerald-500/60 group overflow-hidden border border-white/40 hover:border-emerald-300/70"
            >
              {/* Subtle background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/8 to-transparent rounded-full"></div>
              
              {/* Simple shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-800"></div>
              
              <div className="relative flex items-center justify-center z-10">
                {/* WhatsApp icon - always visible with original colors */}
                <div className="bg-[#25D366] p-0.5 rounded-full mr-1.5 group-hover:bg-[#128C7E] transition-all duration-300 shadow-lg border border-white/30 group-hover:animate-bounce">
                  <FaWhatsapp className="text-white drop-shadow-sm" size={12} />
                </div>
                
                <span className="tracking-wide text-xs font-varela drop-shadow-sm group-hover:text-emerald-50 transition-colors duration-300">Contato</span>
              </div>
            </button>
          </div>
        </div>
      </nav>
      </div>
    </header>
  );
}

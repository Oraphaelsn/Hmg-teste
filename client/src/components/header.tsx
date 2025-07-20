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
    <header className="fixed top-0 w-full z-50 overflow-visible">
      {/* Container principal com efeito de onda que desce */}
      <div className="relative">
        {/* Fundo principal do header */}
        <div className="bg-gradient-to-r from-[#2c744c] to-[#1e5233] shadow-2xl shadow-[#2c744c]/30">
          {/* Soft edge shadows */}
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

        {/* Curva de onda que desce por cima do conteúdo */}
        <div className="absolute left-0 right-0 top-full -mt-1 z-40">
          <svg 
            className="w-full h-16 sm:h-20 md:h-24" 
            viewBox="0 0 1200 100" 
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Onda principal que desce */}
            <path 
              d="M0,0 C150,25 300,45 450,35 C600,25 750,15 900,25 C1050,35 1150,45 1200,20 L1200,0 Z" 
              fill="url(#headerWaveGradient)"
              className="drop-shadow-2xl"
            />
            {/* Onda secundária para profundidade */}
            <path 
              d="M0,0 C200,30 400,50 600,40 C800,30 1000,20 1200,25 L1200,0 Z" 
              fill="url(#headerWaveGradient2)"
              opacity="0.7"
            />
            
            {/* Gradientes para as ondas do header */}
            <defs>
              <linearGradient id="headerWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2c744c" stopOpacity="0.95"/>
                <stop offset="50%" stopColor="#1e5233" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#2c744c" stopOpacity="0.85"/>
              </linearGradient>
              <linearGradient id="headerWaveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e5233" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#065f46" stopOpacity="0.6"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </header>
  );
}

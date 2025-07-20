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
        {/* Fundo principal do header com integração perfeita */}
        <div className="bg-gradient-to-r from-[#2c744c] via-[#245f3a] to-[#2c744c] shadow-2xl shadow-[#2c744c]/50">
          {/* Textura sutil unificada */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
          
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
                  className="relative px-4 py-2 ml-4 bg-gradient-to-r from-[#2c744c] to-[#245f3a] hover:from-[#245f3a] hover:to-[#2c744c] text-white font-black rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-900/40 hover:shadow-emerald-500/60 group overflow-hidden border border-white/40 hover:border-emerald-300/70"
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
                  className="relative px-3 py-1.5 bg-gradient-to-r from-[#2c744c] to-[#245f3a] hover:from-[#245f3a] hover:to-[#2c744c] text-white font-black rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-900/40 hover:shadow-emerald-500/60 group overflow-hidden border border-white/40 hover:border-emerald-300/70"
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

        {/* Sistema de ondas/morros suaves em camadas - conectado diretamente */}
        <div className="absolute left-0 right-0 top-full -mt-1 z-40">
          {/* Sombra suave das ondas */}
          <div className="absolute inset-0 transform translate-y-1 blur-lg opacity-30">
            <svg 
              className="w-full h-12 sm:h-14 md:h-16" 
              viewBox="0 0 1200 60" 
              preserveAspectRatio="none"
              fill="none"
            >
              <path 
                d="M0,0 C200,35 400,20 600,35 C800,20 1000,35 1200,0 L1200,60 L0,60 Z" 
                fill="#000000"
              />
            </svg>
          </div>

          {/* Onda de fundo (mais ampla) - preenchimento completo */}
          <svg 
            className="absolute w-full h-12 sm:h-14 md:h-16" 
            viewBox="0 0 1200 60" 
            preserveAspectRatio="none"
            fill="none"
          >
            <path 
              d="M0,0 L1200,0 L1200,0 C900,40 300,40 0,0 L0,0 Z" 
              fill="url(#waveGradient1)"
              opacity="0.85"
            />
          </svg>

          {/* Onda intermediária (ondulação média) */}
          <svg 
            className="absolute w-full h-12 sm:h-14 md:h-16" 
            viewBox="0 0 1200 60" 
            preserveAspectRatio="none"
            fill="none"
          >
            <path 
              d="M0,0 L1200,0 L1200,5 C1050,15 950,30 800,15 C650,30 550,15 400,30 C250,15 150,30 0,5 L0,0 Z" 
              fill="url(#waveGradient2)"
              opacity="0.90"
            />
          </svg>

          {/* Onda frontal (pequenas ondulações) */}
          <svg 
            className="relative w-full h-12 sm:h-14 md:h-16" 
            viewBox="0 0 1200 60" 
            preserveAspectRatio="none"
            fill="none"
          >
            <path 
              d="M0,0 L1200,0 L1200,8 C1100,25 1000,12 900,25 C800,12 700,25 600,12 C500,25 400,12 300,25 C200,12 100,25 0,8 L0,0 Z" 
              fill="url(#waveGradient3)"
            />
              
            {/* Gradientes para as ondas */}
            <defs>
              {/* Onda de fundo - tom mais escuro para profundidade */}
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2c744c"/>
                <stop offset="50%" stopColor="#245f3a"/>
                <stop offset="100%" stopColor="#2c744c"/>
              </linearGradient>
              
              {/* Onda intermediária - gradiente intercalado */}
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#245f3a"/>
                <stop offset="33%" stopColor="#2c744c"/>
                <stop offset="66%" stopColor="#245f3a"/>
                <stop offset="100%" stopColor="#2c744c"/>
              </linearGradient>
              
              {/* Onda frontal - tom principal dominante */}
              <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2c744c"/>
                <stop offset="25%" stopColor="#245f3a"/>
                <stop offset="50%" stopColor="#2c744c"/>
                <stop offset="75%" stopColor="#245f3a"/>
                <stop offset="100%" stopColor="#2c744c"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </header>
  );
}
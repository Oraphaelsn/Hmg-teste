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
      {/* Modern glassmorphism container */}
      <div className="relative">
        {/* Ultra-modern background with advanced glassmorphism */}
        <div className="bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/20">
          {/* Dynamic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-transparent to-emerald-500/15"></div>
          
          {/* Subtle animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
          
          {/* Modern border accent */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"></div>
          
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center justify-between h-16 sm:h-20">
              {/* Modern Logo */}
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
                  {/* Glow effect behind logo */}
                  <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <img 
                    src={logoOficial} 
                    alt="Estância Morro Grande" 
                    className="w-20 h-12 sm:w-24 sm:h-14 md:w-28 md:h-18 object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(16,185,129,0.5)] filter brightness-110 contrast-110 relative z-10"
                  />
                </div>
              </div>

              {/* Modern Desktop Menu */}
              <div className="hidden md:flex items-center space-x-1">
                <button 
                  onClick={() => scrollToSection("inicio")}
                  className="relative px-5 py-2.5 text-white/90 hover:text-white font-medium text-sm tracking-wide rounded-full group overflow-hidden transition-all duration-500 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
                >
                  <span className="relative z-10">Início</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
                </button>
                <button 
                  onClick={() => scrollToSection("tratamentos")}
                  className="relative px-5 py-2.5 text-white/90 hover:text-white font-medium text-sm tracking-wide rounded-full group overflow-hidden transition-all duration-500 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
                >
                  <span className="relative z-10">Tratamentos</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
                </button>
                <button 
                  onClick={() => scrollToSection("estrutura")}
                  className="relative px-5 py-2.5 text-white/90 hover:text-white font-medium text-sm tracking-wide rounded-full group overflow-hidden transition-all duration-500 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
                >
                  <span className="relative z-10">Estrutura</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
                </button>
                <button 
                  onClick={() => scrollToSection("depoimentos")}
                  className="relative px-5 py-2.5 text-white/90 hover:text-white font-medium text-sm tracking-wide rounded-full group overflow-hidden transition-all duration-500 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
                >
                  <span className="relative z-10">Depoimentos</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
                </button>
                <button 
                  onClick={() => scrollToSection("contato")}
                  className="relative px-6 py-3 ml-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold text-sm tracking-wide rounded-full transform hover:scale-105 transition-all duration-500 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-400/50 group overflow-hidden border border-emerald-400/50 hover:border-emerald-300"
                >
                  {/* Modern gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full"></div>
                  
                  {/* Sophisticated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative flex items-center justify-center z-10">
                    {/* Modern WhatsApp icon */}
                    <div className="bg-white/20 p-1.5 rounded-full mr-3 group-hover:bg-white/30 transition-all duration-500 backdrop-blur-sm border border-white/30">
                      <FaWhatsapp className="text-white drop-shadow-lg" size={16} />
                    </div>
                    
                    <span className="font-medium">Contato</span>
                  </div>
                </button>
              </div>

              {/* Modern Mobile Navigation */}
              <div className="md:hidden flex items-center space-x-3">
                {/* Compact mobile menu */}
                <div className="flex items-center space-x-0.5 text-xs">
                  <button 
                    onClick={() => scrollToSection("inicio")}
                    className="px-3 py-2 text-white/90 hover:text-white font-medium transition-all duration-300 rounded-full hover:bg-white/10 backdrop-blur-sm"
                  >
                    Início
                  </button>
                  <button 
                    onClick={() => scrollToSection("tratamentos")}
                    className="px-3 py-2 text-white/90 hover:text-white font-medium transition-all duration-300 rounded-full hover:bg-white/10 backdrop-blur-sm"
                  >
                    Tratamentos
                  </button>
                  <button 
                    onClick={() => scrollToSection("estrutura")}
                    className="px-3 py-2 text-white/90 hover:text-white font-medium transition-all duration-300 rounded-full hover:bg-white/10 backdrop-blur-sm"
                  >
                    Estrutura
                  </button>
                  <button 
                    onClick={() => scrollToSection("depoimentos")}
                    className="px-3 py-2 text-white/90 hover:text-white font-medium transition-all duration-300 rounded-full hover:bg-white/10 backdrop-blur-sm"
                  >
                    Depoimentos
                  </button>
                </div>
                
                {/* Modern mobile contact button */}
                <button 
                  onClick={() => scrollToSection("contato")}
                  className="relative px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold text-xs tracking-wide rounded-full transform hover:scale-105 transition-all duration-500 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/50 group overflow-hidden border border-emerald-400/50 hover:border-emerald-300"
                >
                  {/* Modern gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full"></div>
                  
                  {/* Sophisticated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative flex items-center justify-center z-10">
                    {/* Modern WhatsApp icon */}
                    <div className="bg-white/20 p-1 rounded-full mr-2 group-hover:bg-white/30 transition-all duration-500 backdrop-blur-sm border border-white/30">
                      <FaWhatsapp className="text-white drop-shadow-lg" size={12} />
                    </div>
                    
                    <span className="font-medium">Contato</span>
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
              {/* Onda de fundo - cor sólida uniforme */}
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2c744c"/>
                <stop offset="100%" stopColor="#2c744c"/>
              </linearGradient>
              
              {/* Onda intermediária - cor sólida */}
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2c744c"/>
                <stop offset="100%" stopColor="#2c744c"/>
              </linearGradient>
              
              {/* Onda frontal - cor sólida */}
              <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2c744c"/>
                <stop offset="100%" stopColor="#2c744c"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </header>
  );
}
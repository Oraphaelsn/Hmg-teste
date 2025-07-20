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
        <div className="bg-gradient-to-r from-[#2c744c] via-[#1e5233] to-[#2c744c] shadow-2xl shadow-[#2c744c]/50">
          {/* Sombras laterais harmoniosas */}
          <div className="absolute -left-3 top-0 bottom-0 w-4 bg-gradient-to-r from-black/25 to-transparent blur-md"></div>
          <div className="absolute -right-3 top-0 bottom-0 w-4 bg-gradient-to-l from-black/25 to-transparent blur-md"></div>
          
          {/* Textura corporativa refinada */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/8"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
          
          {/* Linha superior de excelência */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent"></div>
          
          {/* Preparação para integração perfeita com a curva */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2c744c] via-[#1e5233] to-[#2c744c]"></div>
          
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

        {/* Curva corporativa de borda a borda */}
        <div className="absolute left-0 right-0 top-full z-40">
          {/* Sombra volumétrica para profundidade corporativa */}
          <div className="absolute inset-0 transform translate-y-4 blur-2xl opacity-60">
            <svg 
              className="w-full h-32 sm:h-40 md:h-48 lg:h-56" 
              viewBox="0 0 1200 200" 
              preserveAspectRatio="none"
              fill="none"
            >
              <path 
                d="M0,0 C120,35 240,65 360,55 C480,45 600,35 720,45 C840,55 960,65 1080,55 C1140,50 1180,45 1200,40 L1200,0 Z" 
                fill="#000000"
                opacity="0.7"
              />
            </svg>
          </div>

          {/* Onda principal robusta de borda a borda */}
          <svg 
            className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56" 
            viewBox="0 0 1200 200" 
            preserveAspectRatio="none"
            fill="none"
            style={{
              filter: 'drop-shadow(0 12px 48px rgba(44, 116, 76, 0.5)) drop-shadow(0 6px 24px rgba(0, 0, 0, 0.4))'
            }}
          >
            {/* Camada de conexão robusta com o header */}
            <rect 
              x="0" 
              y="0" 
              width="1200" 
              height="15"
              fill="url(#headerConnectionGradient)"
            />
            
            {/* Onda de fundo suave com curva esquerda harmonizada */}
            <path 
              d="M0,45 C30,20 80,35 150,50 C250,55 350,50 450,45 C600,40 750,35 900,40 C1050,45 1150,50 1200,35 L1200,15 L1200,0 L0,0 Z" 
              fill="url(#headerWaveGradient3)"
              opacity="0.75"
            />
            
            {/* Onda intermediária suave com transição harmoniosa */}
            <path 
              d="M0,35 C25,15 70,25 130,35 C200,40 280,35 380,30 C500,25 650,20 800,25 C950,30 1100,35 1200,25 L1200,12 L1200,0 L0,0 Z" 
              fill="url(#headerWaveGradient2)"
              opacity="0.85"
            />
            
            {/* Onda principal suave com curva descendente harmoniosa */}
            <path 
              d="M0,30 C20,12 60,20 120,30 C200,35 300,30 420,25 C560,20 720,15 880,20 C1020,25 1150,30 1200,20 L1200,8 L1200,0 L0,0 Z" 
              fill="url(#headerWaveGradient)"
            />
            
            {/* Camada superior sutil sem brilho excessivo */}
            <path 
              d="M0,25 C18,10 55,18 110,25 C180,30 270,25 380,20 C520,15 680,10 840,15 C980,20 1120,25 1200,15 L1200,5 L1200,0 L0,0 Z" 
              fill="url(#headerWaveSubtle)"
              opacity="0.4"
            />
              
              {/* Definições de gradientes harmoniosos */}
              <defs>
                {/* Gradiente de conexão para unificar com o header */}
                <linearGradient id="headerConnectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2c744c" stopOpacity="1"/>
                  <stop offset="25%" stopColor="#1e5233" stopOpacity="1"/>
                  <stop offset="50%" stopColor="#2c744c" stopOpacity="1"/>
                  <stop offset="75%" stopColor="#1e5233" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#2c744c" stopOpacity="1"/>
                </linearGradient>
                
                {/* Gradiente principal uniforme ao cabeçalho - sem brilho */}
                <linearGradient id="headerWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2c744c" stopOpacity="0.98"/>
                  <stop offset="25%" stopColor="#1e5233" stopOpacity="0.98"/>
                  <stop offset="50%" stopColor="#2c744c" stopOpacity="0.98"/>
                  <stop offset="75%" stopColor="#1e5233" stopOpacity="0.98"/>
                  <stop offset="100%" stopColor="#2c744c" stopOpacity="0.98"/>
                </linearGradient>
                
                {/* Gradiente intermediário suave */}
                <linearGradient id="headerWaveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2c744c" stopOpacity="0.88"/>
                  <stop offset="33%" stopColor="#1e5233" stopOpacity="0.88"/>
                  <stop offset="66%" stopColor="#2c744c" stopOpacity="0.88"/>
                  <stop offset="100%" stopColor="#1e5233" stopOpacity="0.88"/>
                </linearGradient>
                
                {/* Gradiente de base discreto */}
                <linearGradient id="headerWaveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e5233" stopOpacity="0.78"/>
                  <stop offset="25%" stopColor="#2c744c" stopOpacity="0.78"/>
                  <stop offset="50%" stopColor="#1e5233" stopOpacity="0.78"/>
                  <stop offset="75%" stopColor="#2c744c" stopOpacity="0.78"/>
                  <stop offset="100%" stopColor="#1e5233" stopOpacity="0.78"/>
                </linearGradient>
                
                {/* Gradiente sutil para acabamento */}
                <linearGradient id="headerWaveSubtle" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2c744c" stopOpacity="0.6"/>
                  <stop offset="50%" stopColor="#1e5233" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#2c744c" stopOpacity="0.6"/>
                </linearGradient>
              </defs>
            </svg>
          
          {/* Linha de acabamento inferior para definição precisa */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2c744c]/30 to-transparent"></div>
          
          {/* Reflexo sutil para profissionalismo */}
          <div className="absolute bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent blur-sm"></div>
        </div>
      </div>
    </header>
  );
}
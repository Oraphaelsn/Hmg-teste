import { FaWhatsapp } from "react-icons/fa";
import { Home, Heart, Building2, MessageCircle, Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import logoOficial from "@assets/Estância Morro Grande Branco_1752992752131.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false); // Fechar menu após navegação
  };

  const menuItems = [
    { id: "inicio", icon: Home, label: "Início" },
    { id: "tratamentos", icon: Heart, label: "Tratamentos" },
    { id: "estrutura", icon: Building2, label: "Estrutura" },
    { id: "depoimentos", icon: MessageCircle, label: "Depoimentos" },
  ];

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

              {/* Modern Desktop Navigation with Icons */}
              <div className="hidden md:flex items-center space-x-2">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button 
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="relative px-4 py-3 text-white/90 hover:text-white font-medium text-sm tracking-wide rounded-full group overflow-hidden transition-all duration-500 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20 flex items-center space-x-2"
                      title={item.label}
                    >
                      <IconComponent size={18} className="relative z-10" />
                      <span className="relative z-10">{item.label}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
                    </button>
                  );
                })}
                <button 
                  onClick={() => scrollToSection("contato")}
                  className="relative px-6 py-3 ml-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold text-sm tracking-wide rounded-full transform hover:scale-105 transition-all duration-500 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-400/50 group overflow-hidden border border-emerald-400/50 hover:border-emerald-300"
                >
                  {/* Modern gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full"></div>
                  
                  {/* Sophisticated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative flex items-center justify-center z-10">
                    {/* Modern contact icon */}
                    <div className="bg-white/20 p-1.5 rounded-full mr-3 group-hover:bg-white/30 transition-all duration-500 backdrop-blur-sm border border-white/30">
                      <Phone className="text-white drop-shadow-lg" size={16} />
                    </div>
                    
                    <span className="font-medium">Contato</span>
                  </div>
                </button>
              </div>

              {/* Modern Mobile Navigation */}
              <div className="md:hidden flex items-center space-x-3">
                {/* Hamburger Menu Button */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="relative p-2 text-white/90 hover:text-white transition-all duration-300 rounded-full hover:bg-white/10 backdrop-blur-sm"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                
                {/* Quick Contact Button */}
                <button 
                  onClick={() => scrollToSection("contato")}
                  className="relative px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold text-xs tracking-wide rounded-full transform hover:scale-105 transition-all duration-500 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/50 group overflow-hidden border border-emerald-400/50 hover:border-emerald-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative flex items-center justify-center z-10">
                    <div className="bg-white/20 p-1 rounded-full mr-2 group-hover:bg-white/30 transition-all duration-500 backdrop-blur-sm border border-white/30">
                      <Phone className="text-white drop-shadow-lg" size={12} />
                    </div>
                    <span className="font-medium">Contato</span>
                  </div>
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/20">
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button 
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-white/90 hover:text-white font-medium text-sm tracking-wide rounded-lg group overflow-hidden transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
                    >
                      <IconComponent size={20} className="text-emerald-400" />
                      <span>{item.label}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-lg"></div>
                    </button>
                  );
                })}
                
                {/* Mobile Contact Option in Menu */}
                <button 
                  onClick={() => scrollToSection("contato")}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-white/90 hover:text-white font-medium text-sm tracking-wide rounded-lg group overflow-hidden transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
                >
                  <FaWhatsapp size={20} className="text-green-400" />
                  <span>Contato via WhatsApp</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-lg"></div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
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
        {/* Ultra-transparent glassmorphism background with green tint */}
        <div className="bg-gradient-to-r from-[#2c744c]/30 via-[#1e5233]/25 to-[#2c744c]/30 backdrop-blur-3xl border-b border-[#2c744c]/25 shadow-2xl shadow-[#2c744c]/15">
          {/* Enhanced glass reflection overlay with green hints */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2c744c]/10 via-[#2c744c]/15 to-[#2c744c]/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/15 to-white/10"></div>
          
          {/* Multiple glass layers for depth with green undertones */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2c744c]/8 via-transparent to-[#2c744c]/5"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-white/4"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2c744c]/6 to-transparent"></div>
          
          {/* Subtle animated green shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2c744c]/12 to-transparent animate-pulse"></div>
          
          {/* Glass edge highlights with green tint */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2c744c]/40 to-transparent"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2c744c]/30 to-transparent"></div>
          
          {/* Side glass reflections with green accent */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-[#2c744c]/20 to-transparent"></div>
          <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-[#2c744c]/20 to-transparent"></div>
          
          {/* Ultra glass overlay with green crystalline effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2c744c]/6 via-transparent to-[#2c744c]/4"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/4 via-transparent to-white/2"></div>
          
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
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-[#2c744c]/15 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <img 
                    src={logoOficial} 
                    alt="Estância Morro Grande" 
                    className="w-20 h-12 sm:w-24 sm:h-14 md:w-28 md:h-18 object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(44,116,76,0.6)] filter brightness-110 contrast-110 relative z-10"
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
                      className="relative px-4 py-3 text-white/95 hover:text-white font-medium text-sm tracking-wide rounded-full group overflow-hidden transition-all duration-500 hover:bg-[#2c744c]/20 backdrop-blur-xl border border-[#2c744c]/25 hover:border-[#2c744c]/40 flex items-center space-x-2"
                      title={item.label}
                    >
                      <IconComponent size={18} className="relative z-10" />
                      <span className="relative z-10">{item.label}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#2c744c]/25 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
                    </button>
                  );
                })}
                <a
                  href="https://wa.me/5515997559520?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20tratamentos%20da%20Estância%20Morro%20Grande."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-6 py-3 ml-6 bg-gradient-to-r from-green-600/75 to-green-700/75 hover:from-green-600/85 hover:to-green-700/85 text-white font-semibold text-sm tracking-wide rounded-full transform hover:scale-105 transition-all duration-500 shadow-xl shadow-green-600/25 hover:shadow-green-600/35 group overflow-hidden border border-green-600/40 hover:border-green-600/60 backdrop-blur-xl"
                  title="Fale agora via WhatsApp"
                >
                  {/* Enhanced green glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600/15 to-green-700/10 rounded-full"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/15 to-white/8 rounded-full"></div>
                  
                  {/* Green-tinted shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-600/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative flex items-center justify-center z-10">
                    {/* WhatsApp icon */}
                    <div className="bg-white/20 p-1.5 rounded-full mr-3 group-hover:bg-white/30 transition-all duration-500 backdrop-blur-sm border border-white/30">
                      <FaWhatsapp className="text-white drop-shadow-lg" size={16} />
                    </div>
                    
                    <span className="font-medium">WhatsApp</span>
                  </div>
                </a>
              </div>

              {/* Modern Mobile Navigation */}
              <div className="md:hidden flex items-center space-x-3">
                {/* Hamburger Menu Button */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="relative p-2 text-white/95 hover:text-white transition-all duration-300 rounded-full hover:bg-[#2c744c]/20 backdrop-blur-xl border border-[#2c744c]/25 hover:border-[#2c744c]/40"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                
                {/* Quick WhatsApp Button */}
                <a
                  href="https://wa.me/5515997559520?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20tratamentos%20da%20Estância%20Morro%20Grande."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-4 py-2 bg-gradient-to-r from-green-600/75 to-green-700/75 hover:from-green-600/85 hover:to-green-700/85 text-white font-semibold text-xs tracking-wide rounded-full transform hover:scale-105 transition-all duration-500 shadow-lg shadow-green-600/25 hover:shadow-green-600/35 group overflow-hidden border border-green-600/40 hover:border-green-600/60 backdrop-blur-xl"
                  title="Fale agora via WhatsApp"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600/15 to-green-700/10 rounded-full"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/15 to-white/8 rounded-full"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-600/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative flex items-center justify-center z-10">
                    <div className="bg-white/20 p-1 rounded-full mr-2 group-hover:bg-white/30 transition-all duration-500 backdrop-blur-sm border border-white/30">
                      <FaWhatsapp className="text-white drop-shadow-lg" size={12} />
                    </div>
                    <span className="font-medium">WhatsApp</span>
                  </div>
                </a>
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-[#2c744c]/25 backdrop-blur-3xl border-b border-[#2c744c]/25 shadow-2xl shadow-[#2c744c]/15">
            {/* Green glass overlay for mobile menu */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2c744c]/8 via-[#2c744c]/12 to-[#2c744c]/8"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/8 via-white/12 to-white/8"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#2c744c]/6 via-transparent to-[#2c744c]/3"></div>
            <div className="container mx-auto px-4 py-4 relative z-10">
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button 
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-white/95 hover:text-white font-medium text-sm tracking-wide rounded-lg group overflow-hidden transition-all duration-300 hover:bg-[#2c744c]/20 backdrop-blur-xl border border-[#2c744c]/25 hover:border-[#2c744c]/40"
                    >
                      <IconComponent size={20} className="text-white/80" />
                      <span>{item.label}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#2c744c]/25 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-lg"></div>
                    </button>
                  );
                })}
                
                {/* Mobile WhatsApp Option in Menu */}
                <a
                  href="https://wa.me/5515997559520?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20tratamentos%20da%20Estância%20Morro%20Grande."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center space-x-3 px-4 py-3 text-white/95 hover:text-white font-medium text-sm tracking-wide rounded-lg group overflow-hidden transition-all duration-300 hover:bg-green-600/20 backdrop-blur-xl border border-green-600/25 hover:border-green-600/40"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaWhatsapp size={20} className="text-green-400" />
                  <span>Contato via WhatsApp</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600/25 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-lg"></div>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";

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
    <header className="fixed top-0 w-full border-b border-green-700/30 z-50" style={{ backgroundColor: '#2c744c' }}>
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
              <Heart className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-white font-varela">Estância Morro Grande</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection("inicio")}
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection("tratamentos")}
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Tratamentos
            </button>
            <button 
              onClick={() => scrollToSection("estrutura")}
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Estrutura
            </button>
            <button 
              onClick={() => scrollToSection("depoimentos")}
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Depoimentos
            </button>
            <button 
              onClick={() => scrollToSection("contato")}
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Contato
            </button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-green-700/30" style={{ backgroundColor: '#2c744c' }}>
            <div className="px-4 py-3 space-y-3">
              <button 
                onClick={() => scrollToSection("inicio")}
                className="block text-white/90 hover:text-white transition-colors font-medium"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection("tratamentos")}
                className="block text-white/90 hover:text-white transition-colors font-medium"
              >
                Tratamentos
              </button>
              <button 
                onClick={() => scrollToSection("estrutura")}
                className="block text-white/90 hover:text-white transition-colors font-medium"
              >
                Estrutura
              </button>
              <button 
                onClick={() => scrollToSection("depoimentos")}
                className="block text-white/90 hover:text-white transition-colors font-medium"
              >
                Depoimentos
              </button>
              <button 
                onClick={() => scrollToSection("contato")}
                className="block text-white/90 hover:text-white transition-colors font-medium"
              >
                Contato
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

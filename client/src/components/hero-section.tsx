import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UserCheck } from "lucide-react";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    title: "Você não está sozinho",
    subtitle: "Recuperar é possível com acolhimento, dignidade e segurança",
    gradient: "from-primary/80 to-accent/60"
  },
  {
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    title: "Recuperar é possível",
    subtitle: "Tratamento humanizado com equipe especializada 24 horas",
    gradient: "from-secondary/80 to-primary/60"
  },
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    title: "Acolhimento com dignidade e segurança",
    subtitle: "Ambiente preparado para o seu recomeço com total privacidade",
    gradient: "from-accent/80 to-secondary/60"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="inicio" className="pt-16 relative min-h-screen flex items-center">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide absolute inset-0 ${
              index === currentSlide ? "active" : ""
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 font-light">
            {heroSlides[currentSlide].subtitle}
          </p>
          <Button 
            onClick={scrollToContact}
            size="lg"
            className="bg-white text-primary hover:bg-slate-50 font-semibold px-8 py-4 h-auto text-lg transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <UserCheck className="mr-2" size={20} />
            Fale com um Especialista
          </Button>
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

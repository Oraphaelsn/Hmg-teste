import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UserCheck } from "lucide-react";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    title: "Você não está sozinho",
    subtitle: "Recuperar é possível com acolhimento, dignidade e segurança",
    highlight: "RECUPERAR É POSSÍVEL",
    description: "Na Estância Morro Grande, oferecemos tratamento humanizado e especializado para dependência química e saúde mental, com ambiente seguro e equipe 24h.",
    gradient: "from-slate-900/85 to-brand-green/75"
  },
  {
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    title: "Recomeçar com dignidade",
    subtitle: "Tratamento humanizado com equipe especializada",
    highlight: "AMBIENTE SEGURO",
    description: "Estrutura preparada para acolher você e sua família com total privacidade, conforto e segurança em todas as etapas do tratamento.",
    gradient: "from-slate-900/85 to-brand-green/75"
  },
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    title: "Sua nova vida começa aqui",
    subtitle: "Equipe multidisciplinar especializada em dependência",
    highlight: "TRATAMENTO COMPLETO",
    description: "Abordagem integral com psicólogos, médicos psiquiatras, terapeutas e enfermeiros especializados em recuperação e saúde mental.",
    gradient: "from-slate-900/85 to-brand-green/75"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000); // Aumentei para 7 segundos para dar mais tempo para leitura

    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="inicio" className="pt-20 relative min-h-screen flex items-center justify-center">
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

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-white">
        <div className="max-w-6xl mx-auto fade-in">
          {/* Highlight Badge */}
          <div className="text-center mb-8">
            <span className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-8 py-3 text-sm font-bold tracking-wider text-white/95 animate-pulse uppercase">
              {heroSlides[currentSlide].highlight}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-center font-varela text-5xl md:text-7xl lg:text-8xl font-bold mb-10 leading-tight text-shadow-strong">
            {heroSlides[currentSlide].title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-center text-2xl md:text-3xl lg:text-4xl mb-10 font-varela font-medium text-white/95 text-shadow leading-snug">
            {heroSlides[currentSlide].subtitle}
          </p>

          {/* Description */}
          <div className="max-w-5xl mx-auto text-center mb-16">
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white/90 font-light px-4">
              {heroSlides[currentSlide].description}
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="bg-white text-brand-green hover:bg-slate-50 font-varela font-bold px-10 py-6 h-auto text-xl rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/20"
            >
              <UserCheck className="mr-3" size={24} />
              Fale com um Especialista Agora
            </Button>
          </div>
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

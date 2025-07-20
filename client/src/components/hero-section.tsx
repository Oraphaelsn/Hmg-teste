import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UserCheck } from "lucide-react";

const heroSlides = [
  {
    title: "Você não está sozinho",
    subtitle: "Recuperar é possível com acolhimento, dignidade e segurança",
    highlight: "RECUPERAR É POSSÍVEL",
    description: "Na Estância Morro Grande, oferecemos tratamento humanizado e especializado para dependência química e saúde mental, com ambiente seguro e equipe 24h."
  },
  {
    title: "Recomeçar com dignidade",
    subtitle: "Tratamento humanizado com equipe especializada",
    highlight: "AMBIENTE SEGURO",
    description: "Estrutura preparada para acolher você e sua família com total privacidade, conforto e segurança em todas as etapas do tratamento."
  },
  {
    title: "Sua nova vida começa aqui",
    subtitle: "Equipe multidisciplinar especializada em dependência",
    highlight: "TRATAMENTO COMPLETO",
    description: "Abordagem integral com psicólogos, médicos psiquiatras, terapeutas e enfermeiros especializados em recuperação e saúde mental."
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
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source 
            src="https://estanciamorrogrande.com.br/wp-content/uploads/2023/10/Slider-WEBM-1080.webm" 
            type="video/webm"
          />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 to-brand-green/75" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-white">
        <div className="max-w-6xl mx-auto fade-in">
          {/* Highlight Badge */}
          <div className="text-center mb-6">
            <span className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 text-xs font-bold tracking-wider text-white/95 animate-pulse uppercase">
              {heroSlides[currentSlide].highlight}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-center font-varela text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-shadow-strong">
            {heroSlides[currentSlide].title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-center text-xl md:text-2xl lg:text-3xl mb-6 font-varela font-medium text-white/95 text-shadow leading-snug">
            {heroSlides[currentSlide].subtitle}
          </p>

          {/* Description */}
          <div className="max-w-4xl mx-auto text-center mb-10">
            <p className="text-lg md:text-xl leading-relaxed text-white/90 font-light px-4">
              {heroSlides[currentSlide].description}
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <div className="inline-flex flex-col items-center space-y-3">
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="bg-white text-brand-green hover:bg-slate-50 font-varela font-bold px-8 py-4 h-auto text-lg rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/20"
              >
                <UserCheck className="mr-2" size={20} />
                Fale com um Especialista
              </Button>
              <p className="text-white/80 text-sm font-light">
                • Atendimento 24 horas • 
              </p>
            </div>
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

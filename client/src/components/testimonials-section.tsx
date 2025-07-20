import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "A Clínica Esperança me devolveu minha filha. O atendimento humanizado e a dedicação de toda equipe foram fundamentais para sua recuperação. Hoje ela tem uma vida plena e feliz.",
    name: "Maria Rosa",
    role: "Mãe de paciente",
    initials: "MR",
    gradient: "from-primary to-secondary"
  },
  {
    quote: "Após anos lutando contra a depressão, encontrei na Clínica Esperança o apoio que precisava. A equipe me acolheu com carinho e hoje posso dizer que minha vida mudou completamente.",
    name: "João Silva",
    role: "Ex-paciente",
    initials: "JS",
    gradient: "from-secondary to-accent"
  },
  {
    quote: "Meu esposo estava perdido na dependência química. Graças ao tratamento especializado e ao ambiente acolhedor, ele conseguiu se recuperar. Nossa família está unida novamente.",
    name: "Ana Lucia",
    role: "Esposa de paciente",
    initials: "AL",
    gradient: "from-accent to-primary"
  }
];

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Removed automatic rotation - carousel is now static
  // Users can manually navigate if navigation buttons are added later

  return (
    <section id="depoimentos" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-green mb-4 sm:mb-6">Depoimentos</h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600">Histórias reais de esperança e recuperação</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`carousel-slide ${index === currentTestimonial ? "active" : ""} ${
                  index !== currentTestimonial ? "absolute inset-0" : ""
                }`}
              >
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 md:p-8 text-center">
                  <div className="mb-4 sm:mb-6">
                    <Quote className="text-primary text-2xl sm:text-3xl opacity-30 mx-auto" size={36} />
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-4 sm:mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-center">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center mr-3 sm:mr-4`}>
                      <span className="text-white font-bold text-sm sm:text-base md:text-lg">{testimonial.initials}</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                      <p className="text-slate-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial ? "bg-primary" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

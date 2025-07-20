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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="depoimentos" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-green mb-6">Depoimentos</h2>
          <p className="text-xl text-slate-600">Histórias reais de esperança e recuperação</p>
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
                <div className="bg-slate-50 rounded-2xl p-8 text-center">
                  <div className="mb-6">
                    <Quote className="text-primary text-3xl opacity-30 mx-auto" size={48} />
                  </div>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center mr-4`}>
                      <span className="text-white font-bold text-lg">{testimonial.initials}</span>
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

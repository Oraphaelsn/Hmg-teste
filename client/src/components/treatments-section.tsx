import { Brain, Leaf, Check, UserCheck, Heart, Shield, Clock, Users } from "lucide-react";

export default function TreatmentsSection() {
  return (
    <section id="tratamentos" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-green mb-4 sm:mb-6">Nossos Tratamentos</h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Oferecemos cuidado especializado para saúde mental e dependência química, 
            com abordagem humanizada e equipe multidisciplinar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-10 sm:mb-12 md:mb-16">
          {/* Saúde Mental */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 md:p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                <Brain className="text-primary" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-brand-green">Saúde Mental</h3>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Tratamento especializado para depressão, ansiedade, transtorno bipolar, 
              esquizofrenia e outros transtornos mentais. Nossa abordagem integra 
              terapia psicológica, acompanhamento psiquiátrico e cuidados de enfermagem.
            </p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-center">
                <Check className="text-secondary mr-3" size={20} />
                Avaliação psiquiátrica completa
              </li>
              <li className="flex items-center">
                <Check className="text-secondary mr-3" size={20} />
                Terapia individual e em grupo
              </li>
              <li className="flex items-center">
                <Check className="text-secondary mr-3" size={20} />
                Acompanhamento medicamentoso
              </li>
            </ul>
          </div>

          {/* Dependência Química */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 md:p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-secondary/10 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                <Leaf className="text-secondary" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-brand-green">Dependência Química</h3>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Programa de recuperação para dependência de álcool, drogas e outras substâncias. 
              Focamos na desintoxicação segura, reabilitação e prevenção de recaídas.
            </p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-center">
                <Check className="text-secondary mr-3" size={20} />
                Desintoxicação supervisionada
              </li>
              <li className="flex items-center">
                <Check className="text-secondary mr-3" size={20} />
                Programa de prevenção à recaída
              </li>
              <li className="flex items-center">
                <Check className="text-secondary mr-3" size={20} />
                Terapia cognitivo-comportamental
              </li>
            </ul>
          </div>
        </div>

        {/* Tipos de Internação */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-brand-green mb-8 text-center">Tipos de Internação</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6">
              <h4 className="text-xl font-semibold text-slate-800 mb-4">Internação Voluntária</h4>
              <p className="text-slate-600">
                Quando o próprio paciente reconhece a necessidade de tratamento e busca ajuda. 
                É a forma mais eficaz de iniciar o processo de recuperação.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h4 className="text-xl font-semibold text-slate-800 mb-4">Internação Involuntária</h4>
              <p className="text-slate-600">
                Realizada com autorização familiar e avaliação médica, quando o paciente 
                não possui capacidade de decisão sobre seu tratamento.
              </p>
            </div>
          </div>
        </div>

        {/* Equipe Multidisciplinar */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-brand-green mb-8">Equipe Multidisciplinar 24h</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="text-primary" size={32} />
              </div>
              <h4 className="font-semibold text-slate-800">Psiquiatras</h4>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-secondary text-5xl font-bold tracking-wider drop-shadow-sm" style={{ fontFamily: 'serif', textShadow: '2px 2px 4px rgba(0,0,0,0.15)', fontSize: '2.5rem' }}>Ψ</div>
              </div>
              <h4 className="font-semibold text-slate-800">Psicólogos</h4>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="text-accent" size={32} />
              </div>
              <h4 className="font-semibold text-slate-800">Enfermagem</h4>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-primary" size={32} />
              </div>
              <h4 className="font-semibold text-slate-800">Monitores 24h</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

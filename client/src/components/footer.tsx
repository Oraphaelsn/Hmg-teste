import { Heart, MapPin, Phone, MessageCircle, Mail, Shield } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import logoOficial from "@assets/Estância Morro Grande Branco_1752992752131.png";

// Componente do Selo ISO 9001
function ISO9001Seal() {
  return (
    <svg viewBox="0 0 120 120" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Círculo externo */}
      <circle cx="60" cy="60" r="58" fill="#2c744c" stroke="#fff" strokeWidth="2"/>
      
      {/* Círculo interno */}
      <circle cx="60" cy="60" r="50" fill="none" stroke="#fff" strokeWidth="1"/>
      
      {/* Texto ISO */}
      <text x="60" y="45" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff" fontFamily="Arial, sans-serif">
        ISO
      </text>
      
      {/* Número 9001 */}
      <text x="60" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff" fontFamily="Arial, sans-serif">
        9001
      </text>
      
      {/* Texto CERTIFIED */}
      <text x="60" y="80" textAnchor="middle" fontSize="8" fontWeight="500" fill="#fff" fontFamily="Arial, sans-serif" letterSpacing="1px">
        CERTIFIED
      </text>
      
      {/* Ano */}
      <text x="60" y="92" textAnchor="middle" fontSize="7" fill="#fff" fontFamily="Arial, sans-serif">
        2015
      </text>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo e Descrição */}
          <div className="text-center sm:col-span-2 md:col-span-1">
            <div className="mb-4 sm:mb-6 flex justify-center">
              <img 
                src={logoOficial} 
                alt="Estância Morro Grande" 
                className="w-16 h-12 sm:w-18 sm:h-14 md:w-20 md:h-16 object-contain filter contrast-125 cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:drop-shadow-xl"
                onClick={() => {
                  const element = document.getElementById("inicio");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              />
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              Especializada em tratamento de saúde mental e dependência química, 
              oferecendo cuidado humanizado e ambiente acolhedor para sua recuperação.
            </p>
          </div>

          {/* Informações de Contato */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white text-center">Contato</h4>
            <div className="space-y-2 sm:space-y-3 text-gray-300 text-xs sm:text-sm">
              <div className="flex items-start group">
                <MapPin className="mr-3 text-[#2c744c] mt-0.5 flex-shrink-0 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:rotate-2 transition-all duration-700 cursor-pointer float-gentle pulse-glow" size={20} style={{ filter: 'drop-shadow(1px 1px 4px rgba(44,116,76,0.2)) brightness(1.05)' }} />
                <span>Estrada Nakayama 150, Rodovia Bunjiro Nakao km 67,5</span>
              </div>
              <div className="flex items-center group">
                <Phone className="mr-3 text-[#2c744c] group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:rotate-2 transition-all duration-700 cursor-pointer float-gentle pulse-glow" size={20} style={{ filter: 'drop-shadow(1px 1px 4px rgba(44,116,76,0.2)) brightness(1.05)', animationDelay: '1s' }} />
                <span>(11) 3333-4444</span>
              </div>
              <div className="flex items-center group">
                <MessageCircle className="mr-3 text-[#25D366] group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:rotate-2 transition-all duration-700 cursor-pointer float-gentle pulse-glow" size={20} style={{ filter: 'drop-shadow(1px 1px 4px rgba(37,211,102,0.2)) brightness(1.05)', animationDelay: '2s' }} />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center group">
                <Mail className="mr-3 text-[#2c744c] group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:rotate-2 transition-all duration-700 cursor-pointer float-gentle pulse-glow" size={20} style={{ filter: 'drop-shadow(1px 1px 4px rgba(44,116,76,0.2)) brightness(1.05)', animationDelay: '3s' }} />
                <span>contato@estanciamorrogrande.com.br</span>
              </div>
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white text-center">Redes Sociais</h4>
            <div className="flex justify-center space-x-3 mb-6">
              <a
                href="#"
                className="w-10 h-10 bg-[#2c744c]/20 rounded-full flex items-center justify-center hover:bg-[#2c744c]/40 transition-colors"
              >
                <FaFacebookF size={16} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#2c744c]/20 rounded-full flex items-center justify-center hover:bg-[#2c744c]/40 transition-colors"
              >
                <FaInstagram size={16} className="text-white" />
              </a>
            </div>
          </div>

          {/* Certificações */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-6 text-white">Certificações</h4>
            <div className="flex justify-center mb-4">
              <ISO9001Seal />
            </div>
            <p className="text-gray-400 text-xs">
              Certificado ISO 9001:2015<br/>
              Sistema de Gestão da Qualidade
            </p>
          </div>
        </div>

        {/* Seção de Confidencialidade - Separada */}
        <div className="mt-12 flex justify-center">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 max-w-md text-center">
            <div className="flex items-center justify-center mb-3 group">
              <Shield className="text-[#2c744c] mr-2 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:rotate-2 transition-all duration-700 cursor-pointer float-animation pulse-glow" size={24} style={{ filter: 'drop-shadow(1px 1px 4px rgba(44,116,76,0.2)) brightness(1.05)' }} />
              <span className="font-medium text-base text-white">Confidencialidade Total</span>
            </div>
            <p className="text-gray-400 text-sm">
              Todos os dados são tratados com absoluto sigilo profissional e em total adequação à LGPD (Lei Geral de Proteção de Dados).
            </p>
          </div>
        </div>

        {/* Linha divisória e informações legais */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2025 Estância Morro Grande. Todos os direitos reservados.</p>
            <p className="mt-2">CNPJ: 832.865/0001-38</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

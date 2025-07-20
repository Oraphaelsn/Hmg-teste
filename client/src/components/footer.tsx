import { Heart, MapPin, Phone, MessageCircle, Mail, Shield } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import logoImage from "@assets/Estância Morro Grande Branco_1752989297686.png";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={logoImage} 
                alt="Estância Morro Grande" 
                className="w-16 h-12 object-contain filter contrast-125"
              />
            </div>
            <p className="text-slate-300 leading-relaxed">
              Especializada em tratamento de saúde mental e dependência química, 
              oferecendo cuidado humanizado e ambiente acolhedor para sua recuperação.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contato</h4>
            <div className="space-y-4 text-slate-300">
              <div className="flex items-center">
                <MapPin className="mr-3 text-primary" size={20} />
                <span>Estrada Nakayama 150, Rodovia Bunjiro Nakao km 67,5</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 text-primary" size={20} />
                <span>(11) 3333-4444</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="mr-3 text-secondary" size={20} />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 text-primary" size={20} />
                <span>contato@estanciamorrogrande.com.br</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Redes Sociais</h4>
            <div className="flex space-x-4 mb-8">
              <a
                href="#"
                className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Shield className="text-secondary mr-2" size={20} />
                <span className="font-medium">Confidencialidade Total</span>
              </div>
              <p className="text-slate-300 text-sm">
                Todos os dados são tratados com absoluto sigilo profissional.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
          <p>&copy; 2024 Estância Morro Grande. Todos os direitos reservados. | CNPJ: 00.000.000/0001-00</p>
        </div>
      </div>
    </footer>
  );
}

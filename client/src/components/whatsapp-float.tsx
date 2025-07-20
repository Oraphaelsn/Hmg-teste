import { MessageCircle } from "lucide-react";

export default function WhatsappFloat() {
  const whatsappNumber = "5515997559520";
  const message = "Olá! Gostaria de saber mais sobre os tratamentos da Estância Morro Grande.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      title="Fale agora via WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}

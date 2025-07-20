import { Play, PlayCircle } from "lucide-react";
import { useState } from "react";
import videoFile from "@assets/WhatsApp Video 2025-07-18 at 09.25.19_1752991561715.mp4";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-[#2c744c]/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2c744c] mb-6">
            Conheça Nossa Estância
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Veja de perto nosso ambiente acolhedor e estrutura preparada para 
            oferecer o melhor cuidado em saúde mental e dependência química.
          </p>

          <div className="relative w-full max-w-md mx-auto">
            <div className="relative aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl">
              {!isPlaying ? (
                // Thumbnail com botão de play
                <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2c744c]/20 to-slate-900/60">
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    preload="metadata"
                    muted
                  >
                    <source src={videoFile} type="video/mp4" />
                  </video>
                  
                  {/* Overlay escuro */}
                  <div className="absolute inset-0 bg-black/40" />
                  
                  {/* Botão de play centralizado */}
                  <button
                    onClick={handlePlay}
                    className="relative z-10 group flex items-center justify-center w-16 h-16 bg-white/25 backdrop-blur-sm rounded-full border-2 border-white/40 hover:bg-white/35 hover:border-white/60 transition-all duration-300 hover:scale-110"
                  >
                    <Play 
                      className="w-6 h-6 text-white ml-0.5 group-hover:scale-110 transition-transform" 
                      fill="white"
                    />
                  </button>
                  
                  {/* Texto indicativo estilo reels */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold mb-1 text-center">Tour Estância</h3>
                    <p className="text-xs text-white/90 text-center">Toque para assistir</p>
                  </div>
                  
                  {/* Indicador de vídeo estilo Instagram */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/40 backdrop-blur-sm rounded-full px-2 py-1">
                      <Play className="w-3 h-3 text-white" fill="white" />
                    </div>
                  </div>
                </div>
              ) : (
                // Vídeo em reprodução
                <video
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                >
                  <source src={videoFile} type="video/mp4" />
                  Seu navegador não suporta vídeos HTML5.
                </video>
              )}
            </div>

            {/* Informações adicionais - layout adaptado para formato vertical */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center max-w-2xl mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-md border border-[#2c744c]/10">
                <div className="w-10 h-10 bg-[#2c744c]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <PlayCircle className="w-5 h-5 text-[#2c744c]" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">Ambiente Real</h4>
                <p className="text-xs text-gray-600">Vídeo autêntico mostrando nossos espaços e estrutura</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border border-[#2c744c]/10">
                <div className="w-10 h-10 bg-[#2c744c]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Play className="w-5 h-5 text-[#2c744c]" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">Transparência</h4>
                <p className="text-xs text-gray-600">Mostramos exatamente como é nosso cuidado diário</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border border-[#2c744c]/10">
                <div className="w-10 h-10 bg-[#2c744c]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <PlayCircle className="w-5 h-5 text-[#2c744c]" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">Confiança</h4>
                <p className="text-xs text-gray-600">Veja por si mesmo nosso compromisso com qualidade</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
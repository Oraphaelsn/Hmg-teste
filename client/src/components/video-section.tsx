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

          <div className="relative w-full max-w-3xl mx-auto">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
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
                  
                  {/* Botão de play */}
                  <button
                    onClick={handlePlay}
                    className="relative z-10 group flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110"
                  >
                    <Play 
                      className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" 
                      fill="white"
                    />
                  </button>
                  
                  {/* Texto indicativo */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">Tour pela Estância Morro Grande</h3>
                    <p className="text-sm text-white/80">Clique para assistir</p>
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

            {/* Informações adicionais */}
            <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white p-6 rounded-lg shadow-md border border-[#2c744c]/10">
                <div className="w-12 h-12 bg-[#2c744c]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PlayCircle className="w-6 h-6 text-[#2c744c]" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Ambiente Real</h4>
                <p className="text-sm text-gray-600">Vídeo autêntico mostrando nossos espaços e estrutura</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-[#2c744c]/10">
                <div className="w-12 h-12 bg-[#2c744c]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-6 h-6 text-[#2c744c]" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Transparência</h4>
                <p className="text-sm text-gray-600">Mostramos exatamente como é nosso cuidado diário</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-[#2c744c]/10">
                <div className="w-12 h-12 bg-[#2c744c]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PlayCircle className="w-6 h-6 text-[#2c744c]" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Confiança</h4>
                <p className="text-sm text-gray-600">Veja por si mesmo nosso compromisso com qualidade</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
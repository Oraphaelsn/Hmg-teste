import { Play, PlayCircle } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// Video file from local assets (fallback)
import videoFileLocal from "@assets/WhatsApp Video 2025-07-18 at 09.25.19_1752995612939.mp4";
// Logo da Estância para thumbnail
import logoEstancia from "@assets/Estância Morro Grande Branco_1752992752131.png";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false); // Start with video paused
  
  // Fetch video data from API
  const { data: videoData } = useQuery({
    queryKey: ['/api/videos/section/tour'],
  });

  // Use video from database or fallback to local file
  const videoFile = videoFileLocal; // Always use local file for now since it's the same

  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Video is ready to use from local assets

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-[#2c744c]/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2c744c] mb-6">
            Conheça a Estância Morro Grande!
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Veja de perto nosso ambiente acolhedor e estrutura preparada para 
            oferecer o melhor cuidado em saúde mental e dependência química.
          </p>

          <div className="relative w-full max-w-md mx-auto">
            <div className="relative aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl">
              {!isPlaying ? (
                // Thumbnail com logo da Estância
                <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2c744c] via-[#245f3a] to-[#2c744c]">
                  {/* Logo da Estância como background */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <img 
                      src={logoEstancia} 
                      alt="Estância Morro Grande" 
                      className="w-full h-auto max-w-[200px] object-contain opacity-95 filter drop-shadow-lg"
                    />
                  </div>
                  
                  {/* Overlay sutil para destacar o botão */}
                  <div className="absolute inset-0 bg-black/20" />
                  
                  {/* Botão de play centralizado */}
                  <button
                    onClick={handlePlay}
                    className="relative z-10 group flex items-center justify-center w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full border-2 border-white hover:bg-white hover:border-white transition-all duration-300 hover:scale-110 shadow-2xl"
                  >
                    <Play 
                      className="w-8 h-8 text-[#2c744c] ml-1 group-hover:scale-110 transition-transform" 
                      fill="#2c744c"
                    />
                  </button>
                  
                  {/* Texto indicativo */}
                  <div className="absolute bottom-6 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold mb-1 text-center drop-shadow-lg">Conheça Nossa História!</h3>
                    <p className="text-sm text-white/95 text-center drop-shadow-md">Toque para assistir ao tour completo</p>
                  </div>
                  
                  {/* Indicador de vídeo */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/30">
                      <div className="flex items-center gap-1">
                        <Play className="w-3 h-3 text-white" fill="white" />
                        <span className="text-xs text-white font-medium">VÍDEO</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Vídeo em reprodução (logo desaparece)
                <video
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  onPause={() => setIsPlaying(false)} // Volta para thumbnail se pausar
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
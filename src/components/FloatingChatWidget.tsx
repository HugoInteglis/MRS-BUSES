import React, { useState } from 'react';
import { WHATSAPP_NUMBER, WHATSAPP_RAW } from '../data/transportData';
import { MessageCircle, X, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

export const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const quickOptions = [
    'Cotización para viaje escolar',
    'Renta de bus para turismo',
    'Transporte para personal corporativo',
    'Disponibilidad de Coaster / County',
  ];

  const handleSend = (textToSend?: string) => {
    const msg = textToSend || userMsg;
    if (!msg.trim()) return;

    const encoded = encodeURIComponent(`Hola MRS BUSES, consulta desde la web: ${msg}`);
    window.open(`https://wa.me/${WHATSAPP_RAW}?text=${encoded}`, '_blank');
    setUserMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 print:hidden">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-105 border-2 border-white cursor-pointer"
          aria-label="Abrir chat de WhatsApp"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
          </span>
          <MessageCircle className="w-7 h-7" />
          <span className="hidden sm:inline font-black text-sm pr-1">
            💬 ¿Cotización Rápida?
          </span>
        </button>
      )}

      {isOpen && (
        <div className="bg-neutral-950 rounded-3xl shadow-2xl border border-neutral-800 w-80 sm:w-96 overflow-hidden animate-in slide-in-from-bottom-5 duration-300 text-white">
          {/* Header */}
          <div className="bg-neutral-900 text-white p-5 flex items-center justify-between border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
              <div>
                <h4 className="font-black text-sm text-white">MRS BUSES Atención 24/7</h4>
                <p className="text-[11px] text-amber-400 flex items-center gap-1 font-bold">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  Puntualidad & Seguridad Garantizada
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-amber-400 p-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4 bg-neutral-950 text-neutral-200 text-xs">
            <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 shadow-sm space-y-2">
              <p className="font-bold text-white text-xs">
                ¡Hola! Bienvenido a MRS BUSES 👋
              </p>
              <p className="text-neutral-300 leading-relaxed">
                ¿En qué tipo de transporte estás interesado hoy? Selecciona una opción o escríbenos directamente a WhatsApp ({WHATSAPP_NUMBER}).
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block">
                Consultas habituales:
              </span>
              {quickOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSend(opt)}
                  className="w-full text-left bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-400/50 p-2.5 rounded-xl text-xs font-semibold text-neutral-200 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <span>{opt}</span>
                  <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform">→</span>
                </button>
              ))}
            </div>
            {/* Social icons row */}
            <div className="pt-1 flex items-center justify-between border-t border-neutral-900">
              <span className="text-[10px] text-neutral-400 font-bold">Síguenos:</span>
              <div className="flex items-center gap-1.5">
                <a
                  href="https://www.tiktok.com/@berakahtransporte?_r=1&_t=ZS-98q69DFSBLY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-black px-2 py-1 rounded-lg border border-neutral-700 hover:border-[#FE2C55] text-[10px] font-bold text-white transition-all hover:scale-105"
                >
                  <span className="text-[#25F4EE]">TikTok</span>
                </a>
                <a
                  href="https://www.facebook.com/BusesBerakah?mibextid=wwXIfr&rdid=BMDZn0r6OGXUXaJY&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F198LJP2DaB%2F%3Fmibextid%3DwwXIfr#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-[#1877F2] px-2 py-1 rounded-lg text-[10px] font-bold text-white transition-all hover:scale-105"
                >
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-neutral-900 border-t border-neutral-800 flex gap-2">
            <input
              type="text"
              placeholder="Escribe tu consulta..."
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium placeholder-neutral-500"
            />
            <button
              onClick={() => handleSend()}
              className="bg-amber-400 hover:bg-yellow-400 text-slate-950 p-2.5 rounded-xl shadow transition-colors cursor-pointer font-bold"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

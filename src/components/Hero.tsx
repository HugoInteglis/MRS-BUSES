import React, { useState } from 'react';
import { HERO_DATA, WHATSAPP_RAW, WHATSAPP_NUMBER, FLEET_LIST } from '../data/transportData';
import { ShieldCheck, ArrowRight, Bus, Users, MapPin, CheckCircle2, Clock, MessageCircle } from 'lucide-react';
import { FleetItem } from '../types';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  // Capacity preset selector state
  const [selectedCapacityId, setSelectedCapacityId] = useState<string>('bus-escolar');

  const selectedVehicle: FleetItem =
    FLEET_LIST.find((v) => v.id === selectedCapacityId) || FLEET_LIST[0];

  return (
    <section id="inicio" className="relative bg-neutral-950 overflow-hidden text-white pt-8 pb-16 lg:py-20 border-b border-neutral-800">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.05)_0,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Antetítulo Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-amber-500/10 border border-amber-400/40 text-amber-400 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{HERO_DATA.antetitulo}</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full ml-1">
                GUATEMALA
              </span>
            </div>

            {/* Título Principal (H1) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.12]">
              {HERO_DATA.titulo}
            </h1>

            {/* Subtítulo con acento dorado */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-1.5 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full shadow-sm" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-amber-400 tracking-wider uppercase">
                {HERO_DATA.subtitulo}
              </h2>
            </div>

            {/* Párrafo Descriptivo */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl font-normal">
              {HERO_DATA.parrafo}
            </p>

            {/* Dynamic Group Size Selector Bar - High UX Utility */}
            <div className="bg-neutral-900/90 backdrop-blur-md p-4 rounded-2xl border border-neutral-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                  ¿Para cuántos pasajeros necesitas transporte?
                </span>
                <span className="text-[11px] text-neutral-400 hidden sm:inline">Selecciona tu grupo</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'microbus-estandar', label: '7 a 15 Pax', type: 'Microbús' },
                  { id: 'county-coaster', label: '24 a 28 Pax', type: 'Coaster' },
                  { id: 'mini-pullman', label: '33 Pax', type: 'Mini Pullman' },
                  { id: 'bus-escolar', label: '44 a 48 Pax', type: 'Bus Escolar' },
                ].map((item) => {
                  const isSelected = selectedCapacityId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedCapacityId(item.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 border-amber-400 font-black shadow-md scale-[1.02]'
                          : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-amber-400/50 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Users className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
                        <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${isSelected ? 'bg-black/20 text-slate-950' : 'bg-neutral-900 text-neutral-400'}`}>
                          {item.type}
                        </span>
                      </div>
                      <span className="text-xs font-black mt-1">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onNavigate('cotizacion')}
                className="inline-flex items-center justify-center gap-3 bg-amber-400 hover:bg-yellow-400 text-slate-950 font-black text-base px-8 py-4 rounded-2xl shadow-xl shadow-amber-400/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Solicitar Cotización Gratis</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                onClick={() => onNavigate('flota')}
                className="inline-flex items-center justify-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 border-2 border-amber-400/80 font-bold text-base px-6 py-4 rounded-2xl shadow-sm transition-all cursor-pointer"
              >
                <Bus className="w-5 h-5 text-amber-400" />
                <span>Ver Flota Completa</span>
              </button>
            </div>

            {/* Key Trust Highlights */}
            <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-neutral-300 font-semibold">
              <div className="flex items-center gap-2 bg-neutral-900/50 px-3 py-2 rounded-xl border border-neutral-800/50">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Desde 7 hasta 48 pasajeros</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-900/50 px-3 py-2 rounded-xl border border-neutral-800/50">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Cobertura en toda Guatemala</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-900/50 px-3 py-2 rounded-xl border border-neutral-800/50 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pilotos calificados & GPS</span>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive Vehicle Card Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl p-1 bg-gradient-to-b from-amber-400 via-amber-500/40 to-neutral-900 shadow-2xl shadow-amber-500/10">
              <div className="bg-neutral-950 rounded-[22px] overflow-hidden p-6 sm:p-7 relative border border-neutral-800/80">
                
                {/* Vehicle Selected Title & Capacity Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                      Unidad Seleccionada:
                    </span>
                    <h3 className="text-lg font-black text-white">{selectedVehicle.name}</h3>
                  </div>
                  <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow">
                    <Users className="w-3.5 h-3.5" />
                    <span>{selectedVehicle.capacity}</span>
                  </span>
                </div>

                {/* Real Unit Image Frame */}
                <div className="relative h-60 rounded-2xl overflow-hidden mb-5 group bg-neutral-900/90 border border-neutral-800 flex items-center justify-center p-2 shadow-inner">
                  <img
                    src={selectedVehicle.imageUrl}
                    alt={selectedVehicle.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200';
                    }}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white bg-black/90 backdrop-blur-md px-3 py-2 rounded-xl border border-neutral-800 shadow">
                    <span className="flex items-center gap-1.5 font-bold text-amber-400 text-[11px]">
                      <Bus className="w-3.5 h-3.5 text-amber-400" /> Fotografía Real
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-black border border-emerald-500/30 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Disponible
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-900/80 p-3 rounded-xl border border-neutral-800">
                    {selectedVehicle.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <div className="text-white font-bold text-[11px]">Seguro Incluido</div>
                        <div className="text-neutral-400 text-[10px]">Póliza completa</div>
                      </div>
                    </div>

                    <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <div className="text-white font-bold text-[11px]">Cualquier Ruta</div>
                        <div className="text-neutral-400 text-[10px]">Toda Guatemala</div>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${WHATSAPP_RAW}?text=${encodeURIComponent(`Hola MRS BUSES, deseo cotizar una unidad de ${selectedVehicle.name} (${selectedVehicle.capacity}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 px-4 rounded-xl shadow-lg transition-all text-sm cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Cotizar {selectedVehicle.name} por WhatsApp</span>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


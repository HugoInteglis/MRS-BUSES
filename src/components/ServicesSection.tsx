import React from 'react';
import { SERVICES_HEADER, SERVICES_LIST } from '../data/transportData';
import { ServiceItem } from '../types';
import { Building2, PartyPopper, GraduationCap, Compass, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onNavigate: (sectionId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, onNavigate }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-7 h-7 text-amber-400" />;
      case 'PartyPopper':
        return <PartyPopper className="w-7 h-7 text-amber-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-7 h-7 text-amber-400" />;
      case 'Compass':
      default:
        return <Compass className="w-7 h-7 text-amber-400" />;
    }
  };

  return (
    <section id="servicios" className="py-16 md:py-24 bg-neutral-900 border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Nuestros Servicios</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            {SERVICES_HEADER.linea2}
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto my-4 rounded-full" />
          <p className="text-neutral-300 text-base sm:text-lg">
            {SERVICES_HEADER.descripcion}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="bg-neutral-950 rounded-3xl border border-neutral-800 p-6 sm:p-8 shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Thematic Image Header */}
                <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden mb-6 shadow-md bg-neutral-900">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                  
                  {/* Floating Icon & Badge */}
                  <div className="absolute top-3 left-3 w-12 h-12 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-neutral-800 flex items-center justify-center shadow-lg">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="absolute top-3 right-3 text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-950 bg-amber-400 px-3 py-1 rounded-full shadow border border-yellow-300">
                    MRS BUSES
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-800 flex items-center justify-between gap-4">
                <button
                  onClick={() => onSelectService(service)}
                  className="text-xs font-extrabold text-amber-400 hover:text-yellow-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Ver Detalles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigate('cotizacion')}
                  className="bg-amber-400 hover:bg-yellow-400 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl shadow transition-colors cursor-pointer"
                >
                  Cotizar Servicio
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tailored Plan Banner */}
        <div className="mt-12 bg-gradient-to-r from-neutral-950 via-black to-neutral-900 rounded-3xl p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-amber-400">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black text-white">¿Necesitas un servicio adaptado a tu medida?</h3>
            <p className="text-neutral-300 text-sm max-w-2xl">
              Diseñamos rutas corporativas personalizadas, viajes escolares periódicos y logística especial para cualquier número de pasajeros en Guatemala.
            </p>
          </div>
          <button
            onClick={() => onNavigate('cotizacion')}
            className="bg-amber-400 hover:bg-yellow-400 text-slate-950 font-black px-8 py-4 rounded-xl shadow-lg transition-all text-sm shrink-0 cursor-pointer"
          >
            Consultar Plan Personalizado
          </button>
        </div>
      </div>
    </section>
  );
};

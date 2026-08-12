import React from 'react';
import { FleetItem, ServiceItem } from '../types';
import { WHATSAPP_RAW } from '../data/transportData';
import { X, CheckCircle2, Users, Bus, MessageCircle } from 'lucide-react';

interface DetailModalProps {
  vehicle?: FleetItem | null;
  service?: ServiceItem | null;
  onClose: () => void;
  onNavigateToQuote: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  vehicle,
  service,
  onClose,
  onNavigateToQuote,
}) => {
  if (!vehicle && !service) return null;

  const isVehicle = !!vehicle;
  const title = isVehicle ? vehicle.name : service?.title;
  const description = isVehicle ? vehicle.description : service?.description;
  const image = isVehicle ? vehicle.imageUrl : service?.imageUrl;

  const handleQuoteClick = () => {
    onClose();
    onNavigateToQuote();
  };

  const handleWhatsAppClick = () => {
    const text = isVehicle
      ? `Hola MRS BUSES, me interesa cotizar el vehículo: *${vehicle.name}* (${vehicle.category}).`
      : `Hola MRS BUSES, me interesa solicitar información sobre el servicio: *${service?.title}*.`;

    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_RAW}&text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-950 rounded-3xl border border-neutral-800 shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col relative text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black text-amber-400 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer border border-neutral-800"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-64 sm:h-72 bg-neutral-950 p-2 flex items-center justify-center shrink-0">
          <img
            src={image}
            alt={title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200';
            }}
            className="w-full h-full object-contain rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-black/90 px-3 py-1 rounded-full border border-amber-400/30 inline-block mb-2">
              {isVehicle ? vehicle.category : 'Servicio Especializado'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">{title}</h3>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-neutral-200">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-2">
              Descripción General
            </h4>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">{description}</p>
          </div>

          {/* Vehicle Specific Details */}
          {isVehicle && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-neutral-900 p-3.5 rounded-xl border border-neutral-800 flex items-center gap-3">
                  <div className="p-2 bg-amber-400 text-slate-950 rounded-lg">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-neutral-400 text-[11px] font-bold uppercase">Capacidad</div>
                    <div className="text-white font-extrabold text-sm">{vehicle.capacity}</div>
                  </div>
                </div>

                <div className="bg-neutral-900 p-3.5 rounded-xl border border-neutral-800 flex items-center gap-3">
                  <div className="p-2 bg-amber-400 text-slate-950 rounded-lg">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-neutral-400 text-[11px] font-bold uppercase">Categoría</div>
                    <div className="text-white font-extrabold text-sm">{vehicle.category}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-3">
                  Equipamiento & Amenidades
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {vehicle.amenities.map((eq, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-neutral-200 bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{eq}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Service Specific Details */}
          {!isVehicle && service && (
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-3">
                Características del Servicio
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.features.map((car, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-neutral-200 bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{car}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Buttons */}
        <div className="p-6 bg-neutral-900 border-t border-neutral-800 flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={handleWhatsAppClick}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 px-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Cotizar en WhatsApp Directo</span>
          </button>

          <button
            onClick={handleQuoteClick}
            className="bg-amber-400 hover:bg-yellow-400 text-slate-950 font-black py-3.5 px-5 rounded-xl shadow-md transition-all text-sm cursor-pointer"
          >
            Llenar Formulario de Cotización
          </button>
        </div>
      </div>
    </div>
  );
};

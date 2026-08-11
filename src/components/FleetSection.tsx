import React, { useState, useEffect } from 'react';
import { FLEET_LIST } from '../data/transportData';
import { FleetItem } from '../types';
import { Bus, Users, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

interface FleetSectionProps {
  selectedCategory: string;
  onSelectBusForQuote?: (busName: string) => void;
  onSelectVehicleSubpage?: (vehicle: FleetItem) => void;
  onNavigate: (sectionId: string) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({
  selectedCategory,
  onSelectBusForQuote,
  onSelectVehicleSubpage,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<string>('TODOS');

  useEffect(() => {
    if (selectedCategory) {
      setActiveTab(selectedCategory);
    }
  }, [selectedCategory]);

  const categories = [
    'TODOS',
    'Buses Escolares',
    'County o Coaster',
    'Micro bus Estándar',
    'Mini Pullman',
    'Línea ejecutiva',
  ];

  const filteredVehicles =
    activeTab === 'TODOS'
      ? FLEET_LIST
      : FLEET_LIST.filter(
          (v) => v.category.toLowerCase() === activeTab.toLowerCase()
        );

  const handleQuoteVehicle = (busName: string) => {
    if (onSelectBusForQuote) {
      onSelectBusForQuote(busName);
    }
    onNavigate('cotizacion');
  };

  return (
    <section id="flota" className="py-16 md:py-24 bg-neutral-950 border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 border border-amber-400/30">
            <Bus className="w-3.5 h-3.5 text-amber-400" />
            <span>Nuestra Flota Garantizada</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Flota de Transportes Moderna & Sanitizada
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto my-4 rounded-full" />
          <p className="text-neutral-300 text-base sm:text-lg">
            Selecciona la categoría ideal para tu grupo o evento en Guatemala
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
          <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-2xl border border-neutral-800 shrink-0">
            <div className="px-3 py-1.5 text-xs font-extrabold text-neutral-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Categoría:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === cat
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                    : 'text-neutral-300 hover:text-amber-400 hover:bg-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Container */}
              <div className="relative h-60 overflow-hidden bg-neutral-950 flex items-center justify-center p-2">
                <img
                  src={vehicle.imageUrl}
                  alt={vehicle.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-black/90 backdrop-blur-md text-amber-400 border border-amber-400/30 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  {vehicle.category}
                </div>

                {/* Capacity Badge */}
                <div className="absolute bottom-3 right-3 bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-lg flex items-center gap-1.5 shadow">
                  <Users className="w-3.5 h-3.5" />
                  <span>{vehicle.capacity}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {vehicle.name}
                  </h3>
                  <p className="text-neutral-300 text-xs mt-2 leading-relaxed">
                    {vehicle.description}
                  </p>
                </div>

                {/* Amenities */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider block">
                    Equipamiento & Confort:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {vehicle.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="bg-neutral-950 border border-neutral-800 text-neutral-300 text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>{amenity}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectVehicleSubpage && onSelectVehicleSubpage(vehicle)}
                    className="bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-extrabold text-xs px-3.5 py-2.5 rounded-xl border border-neutral-700 transition-all shrink-0 cursor-pointer flex items-center gap-1"
                  >
                    <span>Ver Subpágina</span>
                  </button>

                  <button
                    onClick={() => handleQuoteVehicle(vehicle.name)}
                    className="bg-amber-400 hover:bg-yellow-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow transition-all shrink-0 cursor-pointer"
                  >
                    Cotizar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

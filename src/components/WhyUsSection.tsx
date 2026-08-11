import React from 'react';
import { WHY_US_DATA } from '../data/transportData';
import { FeatureItem } from '../types';
import { ShieldCheck, Award, CheckCircle2, Sparkles } from 'lucide-react';

interface WhyUsSectionProps {
  onSelectFeature?: (feature: FeatureItem) => void;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ onSelectFeature }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-7 h-7 text-amber-400 group-hover:text-slate-950 transition-colors" />;
      case 'Award':
        return <Award className="w-7 h-7 text-amber-400 group-hover:text-slate-950 transition-colors" />;
      case 'CheckCircle2':
      default:
        return <CheckCircle2 className="w-7 h-7 text-amber-400 group-hover:text-slate-950 transition-colors" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-neutral-900 border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Ventajas Competitivas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {WHY_US_DATA.titulo}
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto my-4 rounded-full" />
          <p className="text-neutral-300 text-base sm:text-lg">
            {WHY_US_DATA.descripcion}
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY_US_DATA.cajas.map((caja, idx) => (
            <div
              key={caja.id}
              className="bg-neutral-950 rounded-3xl border border-neutral-800 p-8 shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-400 transition-all duration-300">
                    {getIcon(caja.iconName)}
                  </div>
                  <span className="text-3xl font-black text-neutral-700 group-hover:text-amber-400 transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {caja.title}
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                  {caja.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <button
                  onClick={() =>
                    onSelectFeature &&
                    onSelectFeature({
                      id: caja.id,
                      title: caja.title,
                      description: caja.description,
                      detailText: caja.detailText,
                    })
                  }
                  className="text-xs font-extrabold text-amber-400 hover:text-yellow-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Más detalles</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

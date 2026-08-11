import React from 'react';
import { STATS_DATA } from '../data/transportData';
import { Bus, Users, Building, Route } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-8 h-8 text-amber-400" />;
      case 'Building':
        return <Building className="w-8 h-8 text-amber-400" />;
      case 'Route':
        return <Route className="w-8 h-8 text-amber-400" />;
      case 'Bus':
      default:
        return <Bus className="w-8 h-8 text-amber-400" />;
    }
  };

  return (
    <section className="py-16 bg-neutral-950 text-white relative overflow-hidden border-y border-neutral-800">
      {/* Glow Effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS_DATA.map((stat) => (
            <div
              key={stat.id}
              className="bg-neutral-900/90 backdrop-blur-md p-6 rounded-3xl border border-neutral-800 hover:border-amber-400 transition-all group shadow-xl"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                {getIcon(stat.iconName)}
              </div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                {stat.displayValue
                  ? stat.displayValue
                  : `${stat.prefix || ''}${stat.targetNumber.toLocaleString('en-US')}${stat.suffix || ''}`}
              </div>
              <div className="text-xs sm:text-sm font-black text-white mt-2 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

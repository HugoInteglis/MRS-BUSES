import React from 'react';
import { ABOUT_DATA } from '../data/transportData';
import { ShieldCheck, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre-nosotros" className="py-16 md:py-24 bg-neutral-950 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image Stack */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400 bg-neutral-950 p-2 flex items-center justify-center">
              <img
                src="https://i.ibb.co/4wW8FV5n/IMG-1853-Editada-2048x1439.webp"
                alt="MRS BUSES Equipo y Flota"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200';
                }}
                className="w-full max-h-[440px] object-contain rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 bg-neutral-900/95 backdrop-blur-md p-4 rounded-2xl border border-neutral-800 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-400 rounded-xl text-slate-950 font-black">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white font-extrabold text-sm">Garantía de Satisfacción</div>
                    <div className="text-neutral-400 text-xs">Puntualidad y Confort Certificado</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Floating Badge */}
            <div className="absolute -top-6 -right-6 bg-amber-400 text-slate-950 p-5 rounded-2xl shadow-xl hidden sm:block border-2 border-black">
              <div className="text-3xl font-black">15+</div>
              <div className="text-xs font-black uppercase tracking-wider">Años de</div>
              <div className="text-xs font-black uppercase tracking-wider">Experiencia</div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-amber-400/30">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Conócenos</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {ABOUT_DATA.titulo}
            </h2>

            <div className="w-16 h-1 bg-amber-400 rounded-full" />

            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              {ABOUT_DATA.parrafOS.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Core Values */}
            <div className="pt-2">
              <span className="text-xs font-black text-neutral-400 uppercase tracking-wider block mb-3">
                Pilares fundamentales de nuestro servicio:
              </span>
              <div className="flex flex-wrap gap-2">
                {['Seguridad Vial', 'Puntualidad 100%', 'Monitoreo GPS', 'Conductores Certificados'].map((val) => (
                  <span
                    key={val}
                    className="inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-lg"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>{val}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

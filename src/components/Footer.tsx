import React from 'react';
import { COMPANY_NAME, WHATSAPP_NUMBER, WHATSAPP_RAW } from '../data/transportData';
import { Logo } from './Logo';
import { MessageCircle, Phone, MapPin, ShieldCheck, Lock } from 'lucide-react';
import { VisaLogo, MastercardLogo } from './PaymentLogos';
import { SocialLinks } from './SocialLinks';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectFleetCategory: (category: string) => void;
  onOpenAdminLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectFleetCategory, onOpenAdminLogin }) => {
  const fleetCategories = [
    'Buses Escolares',
    'County o Coaster',
    'Micro bus Estándar',
    'Mini Pullman',
    'Línea ejecutiva',
  ];

  const handleFleetClick = (cat: string) => {
    onSelectFleetCategory(cat);
    onNavigate('flota');
  };

  return (
    <footer className="bg-amber-400 text-slate-950 border-t-4 border-amber-500 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-amber-500/40">
          {/* Brand Info Column */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="lg" variant="header" />
            <p className="text-slate-900 text-xs sm:text-sm font-semibold leading-relaxed max-w-sm pt-2">
              Soluciones integrales de alquiler de transporte de personal, excursiones escolares, viajes turísticos y eventos especiales en Guatemala.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-slate-950 font-black">
              <ShieldCheck className="w-4 h-4 text-slate-950 shrink-0" />
              <span>Unidades 100% aseguradas con GPS y sanitización</span>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 border-t border-amber-500/40 space-y-2">
              <span className="text-xs font-black uppercase text-slate-950 block">
                Redes Sociales Oficiales:
              </span>
              <SocialLinks variant="footer" />
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-slate-950 font-black text-sm uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs font-black text-slate-900">
              <li>
                <button
                  onClick={() => onNavigate('inicio')}
                  className="hover:text-amber-900 transition-colors cursor-pointer"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sobre-nosotros')}
                  className="hover:text-amber-900 transition-colors cursor-pointer"
                >
                  Sobre Nosotros
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('servicios')}
                  className="hover:text-amber-900 transition-colors cursor-pointer"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('flota')}
                  className="hover:text-amber-900 transition-colors cursor-pointer"
                >
                  Nuestra Flota
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cotizacion')}
                  className="hover:text-amber-900 transition-colors cursor-pointer"
                >
                  Cotización / Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Fleet Categories Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-slate-950 font-black text-sm uppercase tracking-wider">
              Categorías de Flota
            </h4>
            <ul className="space-y-2 text-xs font-extrabold text-slate-900">
              {fleetCategories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleFleetClick(cat)}
                    className="hover:text-amber-900 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="text-slate-950 font-black">▸</span>
                    <span>{cat}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Direct Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-slate-950 font-black text-sm uppercase tracking-wider">
              Contacto Directo
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href={`https://wa.me/${WHATSAPP_RAW}?text=Hola%20MRS%20BUSES,%20deseo%20solicitar%20informaci%C3%B3n%20y%20cotizaci%C3%B3n.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-slate-950 hover:bg-neutral-900 p-3 rounded-xl text-amber-400 font-black transition-all shadow-md group"
              >
                <MessageCircle className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>WhatsApp: {WHATSAPP_NUMBER}</span>
              </a>

              <a
                href="tel:+50249616621"
                className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 p-2.5 rounded-xl text-white font-bold transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Llamadas: +502 4961-6621</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-950 font-bold px-1">
                <MapPin className="w-4 h-4 text-slate-950 shrink-0 mt-0.5" />
                <span>Ciudad de Guatemala, Guatemala C.A.</span>
              </div>

              {/* Payment Card Logos in Footer */}
              <div className="pt-2 border-t border-amber-500/30">
                <span className="text-[10px] font-black uppercase text-slate-950 block mb-1.5">Aceptamos tarjetas de crédito:</span>
                <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl w-fit">
                  <VisaLogo className="h-6 w-auto" />
                  <MastercardLogo className="h-6 w-auto" />
                  <span className="text-[10px] font-bold text-amber-400 pl-1">Visa / Mastercard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Footer Copyright */}
      <div className="bg-slate-950 text-neutral-300 py-4 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs font-medium gap-3">
          <div>
            © {new Date().getFullYear()} <span className="text-amber-400 font-black">{COMPANY_NAME} BY BERAKAH</span>. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <SocialLinks variant="header" />

            <div className="flex items-center gap-1.5 bg-neutral-900 px-2.5 py-1 rounded-lg border border-neutral-800">
              <VisaLogo className="h-4 w-auto" />
              <MastercardLogo className="h-4 w-auto" />
            </div>
            <a
              href="https://integlis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-amber-400 transition-colors font-semibold flex items-center gap-1"
            >
              <span>Sitio web creado por</span>
              <span className="text-amber-400 font-black underline decoration-amber-400/50 underline-offset-2">Integlis.com</span>
            </a>

            {onOpenAdminLogin && (
              <button
                onClick={onOpenAdminLogin}
                className="text-neutral-500 hover:text-amber-400 transition-colors text-[11px] font-bold flex items-center gap-1 bg-neutral-900/80 hover:bg-neutral-900 px-2 py-1 rounded-md border border-neutral-800 cursor-pointer"
                title="Acceso Propietario / Cotizador Oficial"
              >
                <Lock className="w-3 h-3" />
                <span>Acceso Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

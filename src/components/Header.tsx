import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronDown, Menu, X, ShieldCheck, Clock, Phone, Bus } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_RAW } from '../data/transportData';
import { Logo } from './Logo';
import { SocialLinks } from './SocialLinks';

interface HeaderProps {
  onSelectFleetCategory: (category: string) => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectFleetCategory, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFleetDropdownOpen, setIsFleetDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFleetClick = (categoryName: string) => {
    onSelectFleetCategory(categoryName);
    setIsFleetDropdownOpen(false);
    setIsMobileMenuOpen(false);
    onNavigate('flota');
  };

  const fleetOptions = [
    'Buses Escolares',
    'County o Coaster',
    'Micro bus Estándar',
    'Mini Pullman',
    'Línea ejecutiva',
  ];

  return (
    <>
      {/* Top Utility Bar - High-Contrast Premium Black & Gold Accent */}
      <div className="bg-neutral-950 text-white text-xs py-2 px-3 sm:px-4 border-b-2 border-amber-400 shadow-md overflow-hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          
          {/* Trust badges - Desktop View */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-6 min-w-0">
            <span className="inline-flex items-center gap-1.5 font-extrabold text-amber-400 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800 text-xs whitespace-nowrap shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Más de 15 años de excelencia en Guatemala</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-neutral-300 font-bold bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800 text-xs whitespace-nowrap shrink-0">
              <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
              <span>Atención y Cotizaciones 24/7</span>
            </span>
          </div>

          {/* Continuous Scrolling Horizontal Marquee Ticker - Mobile View */}
          <div className="md:hidden flex items-center min-w-0 flex-1 mr-2 overflow-hidden relative">
            <div className="animate-marquee">
              <div className="flex items-center gap-3 shrink-0 pr-3">
                <span className="inline-flex items-center gap-1.5 font-bold text-amber-400 bg-neutral-900 px-2.5 py-1 rounded-full border border-neutral-800 text-[11px] whitespace-nowrap">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-white font-semibold">Más de 15 años de excelencia en Guatemala</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-bold text-emerald-400 bg-neutral-900 px-2.5 py-1 rounded-full border border-neutral-800 text-[11px] whitespace-nowrap">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-white font-semibold">Atención y Cotizaciones 24/7</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-bold text-amber-400 bg-neutral-900 px-2.5 py-1 rounded-full border border-neutral-800 text-[11px] whitespace-nowrap">
                  <Bus className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-white font-semibold">Alquiler de Buses, Coaster y Microbuses</span>
                </span>
              </div>

              {/* Duplicate for 100% seamless continuous infinite loop */}
              <div className="flex items-center gap-3 shrink-0 pr-3">
                <span className="inline-flex items-center gap-1.5 font-bold text-amber-400 bg-neutral-900 px-2.5 py-1 rounded-full border border-neutral-800 text-[11px] whitespace-nowrap">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-white font-semibold">Más de 15 años de excelencia en Guatemala</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-bold text-emerald-400 bg-neutral-900 px-2.5 py-1 rounded-full border border-neutral-800 text-[11px] whitespace-nowrap">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-white font-semibold">Atención y Cotizaciones 24/7</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-bold text-amber-400 bg-neutral-900 px-2.5 py-1 rounded-full border border-neutral-800 text-[11px] whitespace-nowrap">
                  <Bus className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-white font-semibold">Alquiler de Buses, Coaster y Microbuses</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Contact Action Buttons & Social Icons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            <SocialLinks variant="header" />

            <a
              href={`https://api.whatsapp.com/send?phone=${WHATSAPP_RAW}&text=${encodeURIComponent('Hola MRS BUSES, deseo cotizar un servicio de alquiler de transporte.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-2.5 sm:px-3 py-1 rounded-full text-[11px] flex items-center gap-1 transition-all shadow-md hover:scale-105 whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">WhatsApp Directo</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>

            <a
              href={`tel:+50249616621`}
              className="bg-amber-400 hover:bg-yellow-300 text-slate-950 font-black px-2.5 sm:px-3 py-1 rounded-full text-[11px] flex items-center gap-1 transition-all shadow-md hover:scale-105 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-slate-950 shrink-0" />
              <span>4961-6621</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header - Yellow (bg-amber-400) with High-Contrast Dark Controls */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-amber-400/95 backdrop-blur-md shadow-xl py-1.5 border-b-2 border-amber-500'
            : 'bg-amber-400 py-2 border-b-2 border-amber-500'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div onClick={() => onNavigate('inicio')} className="cursor-pointer">
            <Logo size="md" variant="header" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7">
            <button
              onClick={() => onNavigate('inicio')}
              className="text-slate-950 hover:text-amber-900 font-black text-sm transition-colors py-2 cursor-pointer"
            >
              Inicio
            </button>

            {/* Nuestra Flota Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsFleetDropdownOpen(true)}
              onMouseLeave={() => setIsFleetDropdownOpen(false)}
            >
              <button
                onClick={() => onNavigate('flota')}
                className="flex items-center gap-1 text-slate-950 hover:text-amber-900 font-black text-sm transition-colors py-2 cursor-pointer"
              >
                <span>Nuestra Flota</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isFleetDropdownOpen ? 'rotate-180 text-slate-950' : ''
                  }`}
                />
              </button>

              {isFleetDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in duration-200 text-white">
                  <div className="px-4 py-2 border-b border-neutral-800 mb-1">
                    <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider">
                      Categorías de Flota
                    </span>
                  </div>
                  {fleetOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFleetClick(option)}
                      className="w-full text-left px-4 py-2.5 text-sm text-neutral-200 hover:text-slate-950 hover:bg-amber-400 font-bold transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <span>{option}</span>
                      <span className="text-xs text-amber-400 group-hover:text-slate-950 transition-colors">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('sobre-nosotros')}
              className="text-slate-950 hover:text-amber-900 font-black text-sm transition-colors py-2 cursor-pointer"
            >
              Sobre Nosotros
            </button>

            <button
              onClick={() => onNavigate('servicios')}
              className="text-slate-950 hover:text-amber-900 font-black text-sm transition-colors py-2 cursor-pointer"
            >
              Servicios
            </button>

            <button
              onClick={() => onNavigate('faq')}
              className="text-slate-950 hover:text-amber-900 font-black text-sm transition-colors py-2 cursor-pointer"
            >
              Preguntas Frecuentes
            </button>

            <button
              onClick={() => onNavigate('cotizacion')}
              className="text-slate-950 hover:text-amber-900 font-black text-sm transition-colors py-2 cursor-pointer"
            >
              Contacto
            </button>
          </nav>

          {/* Quick Contact Button */}
          <div className="hidden lg:flex items-center">
            <a
              href={`https://wa.me/${WHATSAPP_RAW}?text=Hola%20MRS%20BUSES,%20deseo%20solicitar%20informaci%C3%B3n%20y%20cotizaci%C3%B3n.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-950 hover:bg-neutral-900 text-amber-400 font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 border border-slate-900"
            >
              <MessageCircle className="w-4 h-4 text-amber-400" />
              <span>Cotizar por WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={`https://wa.me/${WHATSAPP_RAW}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-950 text-amber-400 rounded-xl shadow"
              aria-label="WhatsApp direct"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-950 hover:bg-amber-500 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-slate-950" /> : <Menu className="w-6 h-6 text-slate-950" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-amber-400 border-b border-amber-500 px-4 pt-3 pb-6 space-y-2 animate-in fade-in duration-200 shadow-2xl text-slate-950">
            <button
              onClick={() => {
                onNavigate('inicio');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 text-slate-950 hover:bg-amber-500 rounded-xl text-base font-black"
            >
              Inicio
            </button>

            <div className="py-2 border-y border-amber-500/50">
              <span className="block px-3 text-xs font-black text-slate-950 uppercase tracking-wider mb-2">
                Nuestra Flota:
              </span>
              <div className="pl-3 space-y-1">
                {fleetOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFleetClick(option)}
                    className="w-full text-left py-2 px-3 text-slate-900 hover:bg-amber-500 hover:text-slate-950 rounded-lg text-sm font-extrabold flex items-center justify-between"
                  >
                    <span>{option}</span>
                    <span className="text-xs text-slate-950 font-black">Ver</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onNavigate('sobre-nosotros');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 text-slate-950 hover:bg-amber-500 rounded-xl text-base font-black"
            >
              Sobre Nosotros
            </button>

            <button
              onClick={() => {
                onNavigate('servicios');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 text-slate-950 hover:bg-amber-500 rounded-xl text-base font-black"
            >
              Servicios
            </button>

            <button
              onClick={() => {
                onNavigate('faq');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 text-slate-950 hover:bg-amber-500 rounded-xl text-base font-black"
            >
              Preguntas Frecuentes
            </button>

            <button
              onClick={() => {
                onNavigate('cotizacion');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 text-slate-950 hover:bg-amber-500 rounded-xl text-base font-black"
            >
              Contacto
            </button>

            <div className="pt-2 space-y-2">
              <a
                href={`https://wa.me/${WHATSAPP_RAW}?text=Hola%20MRS%20BUSES,%20deseo%20solicitar%20informaci%C3%B3n%20y%20cotizaci%C3%B3n.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-slate-950 text-amber-400 font-black py-3 px-4 rounded-xl shadow-md text-sm"
              >
                <span>💬</span>
                <span>Contactar WhatsApp: {WHATSAPP_NUMBER}</span>
              </a>

              <div className="pt-2 border-t border-amber-500/60">
                <span className="block text-[11px] font-black text-slate-950 uppercase tracking-wider mb-2 text-center">
                  Síguenos en Redes Sociales:
                </span>
                <SocialLinks variant="footer" className="justify-center" />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { WhyUsSection } from './components/WhyUsSection';
import { FleetSection } from './components/FleetSection';
import { FleetSubpage } from './components/FleetSubpage';
import { StatsSection } from './components/StatsSection';
import { PaymentBanner } from './components/PaymentBanner';
import { FaqSection } from './components/FaqSection';
import { QuoteFormSection } from './components/QuoteFormSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { FloatingChatWidget } from './components/FloatingChatWidget';
import { DetailModal } from './components/DetailModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminQuoteGenerator } from './components/AdminQuoteGenerator';

import { FleetItem, ServiceItem } from './types';
import { FLEET_LIST } from './data/transportData';

export default function App() {
  const [selectedFleetCategory, setSelectedFleetCategory] = useState<string>('TODOS');
  const [subpageVehicle, setSubpageVehicle] = useState<FleetItem | null>(null);
  const [prefilledBusForQuote, setPrefilledBusForQuote] = useState<string>('');
  const [selectedVehicleModal, setSelectedVehicleModal] = useState<FleetItem | null>(null);
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);

  // Admin Modal States
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminQuoteOpen, setIsAdminQuoteOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleNavigate = (sectionId: string) => {
    // If we are currently in a subpage view and user navigates to home section, clear subpage
    if (subpageVehicle && sectionId !== 'flota') {
      setSubpageVehicle(null);
    }

    setTimeout(() => {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSelectFleetCategory = (category: string) => {
    setSelectedFleetCategory(category);
    
    // Find matching fleet vehicle if user clicked a specific category
    const matchingVehicle = FLEET_LIST.find(
      (v) => v.category.toLowerCase() === category.toLowerCase() || v.name.toLowerCase() === category.toLowerCase()
    );

    if (matchingVehicle) {
      setSubpageVehicle(matchingVehicle);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSubpageVehicle(null);
      handleNavigate('flota');
    }
  };

  const handleSelectVehicleSubpage = (vehicle: FleetItem) => {
    setSubpageVehicle(vehicle);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuoteVehicleFromCard = (busName: string) => {
    setPrefilledBusForQuote(busName);
    setSubpageVehicle(null);
    handleNavigate('cotizacion');
  };

  const closeModal = () => {
    setSelectedVehicleModal(null);
    setSelectedServiceModal(null);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
      {/* Navigation Header */}
      <Header
        onSelectFleetCategory={handleSelectFleetCategory}
        onNavigate={handleNavigate}
      />

      {/* Render dedicated Subpage View if a vehicle is selected */}
      {subpageVehicle ? (
        <FleetSubpage
          key={subpageVehicle.id}
          vehicle={subpageVehicle}
          onBack={() => setSubpageVehicle(null)}
          onQuote={(busName) => {
            setPrefilledBusForQuote(busName);
            setSubpageVehicle(null);
            handleNavigate('cotizacion');
          }}
        />
      ) : (
        /* Main Landing Page Sections */
        <main>
          {/* Hero Section */}
          <Hero onNavigate={handleNavigate} />

          {/* Services Section */}
          <ServicesSection
            onSelectService={(service) => setSelectedServiceModal(service)}
            onNavigate={handleNavigate}
          />

          {/* Sobre Nosotros */}
          <AboutSection />

          {/* ¿Por qué elegirnos? */}
          <WhyUsSection />

          {/* Flota de Vehículos */}
          <FleetSection
            selectedCategory={selectedFleetCategory}
            onSelectBusForQuote={handleQuoteVehicleFromCard}
            onSelectVehicleSubpage={handleSelectVehicleSubpage}
            onNavigate={handleNavigate}
          />

          {/* Estadísticas de Confianza */}
          <StatsSection />

          {/* Banner de Métodos de Pago */}
          <PaymentBanner />

          {/* Preguntas y Respuestas Frecuentes (FAQ's) */}
          <FaqSection onNavigate={handleNavigate} />

          {/* Formulario de Cotización & Contacto */}
          <QuoteFormSection prefilledBusType={prefilledBusForQuote} />
        </main>
      )}

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectFleetCategory={handleSelectFleetCategory}
        onOpenAdminLogin={() => {
          if (isAdminLoggedIn) {
            setIsAdminQuoteOpen(true);
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
      />

      {/* Utilities */}
      <ScrollToTop />
      <FloatingChatWidget />

      {/* Detail Modal */}
      <DetailModal
        vehicle={selectedVehicleModal}
        service={selectedServiceModal}
        onClose={closeModal}
        onNavigateToQuote={() => handleNavigate('cotizacion')}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoggedIn(true);
          setIsAdminLoginOpen(false);
          setIsAdminQuoteOpen(true);
        }}
      />

      {/* Admin Quote Generator Dashboard */}
      <AdminQuoteGenerator
        isOpen={isAdminQuoteOpen}
        onClose={() => setIsAdminQuoteOpen(false)}
        onLogout={() => {
          setIsAdminLoggedIn(false);
          setIsAdminQuoteOpen(false);
        }}
      />
    </div>
  );
}

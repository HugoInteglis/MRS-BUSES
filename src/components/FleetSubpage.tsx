import React, { useState, useEffect } from 'react';
import { FleetItem } from '../types';
import { WHATSAPP_RAW, WHATSAPP_NUMBER } from '../data/transportData';
import {
  ArrowLeft,
  Users,
  Bus,
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
  Phone,
  HelpCircle,
  FileText,
  Clock,
  ChevronRight,
  Camera,
} from 'lucide-react';
import { VisaLogo, MastercardLogo } from './PaymentLogos';
import { FaqSection } from './FaqSection';

interface FleetSubpageProps {
  vehicle: FleetItem;
  onBack: () => void;
  onQuote: (busName: string) => void;
}

export const FleetSubpage: React.FC<FleetSubpageProps> = ({
  vehicle,
  onBack,
  onQuote,
}) => {
  const inc = vehicle.serviceIncludes;
  const galleryList = vehicle.galleryUrls && vehicle.galleryUrls.length > 0
    ? vehicle.galleryUrls
    : [vehicle.imageUrl];

  const [activeImage, setActiveImage] = useState<string>(galleryList[0]);

  useEffect(() => {
    const list = vehicle.galleryUrls && vehicle.galleryUrls.length > 0
      ? vehicle.galleryUrls
      : [vehicle.imageUrl];
    setActiveImage(list[0]);
  }, [vehicle.id, vehicle.imageUrl]);

  const handleWhatsAppQuote = () => {
    const text = [
      `*CONSULTA DE UNIDAD - MRS BUSES*`,
      `------------------------------------`,
      `Hola MRS BUSES, deseo cotizar la siguiente unidad:`,
      ``,
      `- *Vehículo:* ${vehicle.name}`,
      `- *Capacidad:* ${vehicle.capacity}`,
      `- *Categoría:* ${vehicle.category}`,
      ``,
      `Por favor brindar información sobre disponibilidad y tarifas.`,
      `------------------------------------`,
      `*Solicitud enviada desde mrsbuses.com*`
    ].join('\n');
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_RAW}&text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen pb-20 animate-in fade-in duration-300">
      {/* Subpage Header & Navigation Bar */}
      <div className="bg-neutral-900 border-b border-neutral-800 py-4 px-4 sm:px-6 lg:px-8 sticky top-16 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-amber-400 hover:text-yellow-300 font-extrabold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la Flota General</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-neutral-400 hidden sm:flex">
            <span>Flota</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-amber-400 font-bold">{vehicle.category}</span>
          </div>
        </div>
      </div>

      {/* Subpage Hero Header */}
      <div className="relative bg-gradient-to-b from-neutral-900 to-neutral-950 border-b border-neutral-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                NUESTRA FLOTA DE {vehicle.name.toUpperCase()}
              </span>
              <span className="bg-neutral-800 text-amber-400 border border-neutral-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>{vehicle.capacity}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {vehicle.name}
            </h1>

            {vehicle.subpageSubtitle && (
              <p className="text-amber-400 font-extrabold text-sm sm:text-base uppercase tracking-wider">
                {vehicle.subpageSubtitle}
              </p>
            )}

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-3xl pt-2">
              {vehicle.subpageIntro || vehicle.description}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <button
              onClick={handleWhatsAppQuote}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all text-sm cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>Cotizar por WhatsApp Ahora</span>
            </button>

            <button
              onClick={() => onQuote(vehicle.name)}
              className="bg-amber-400 hover:bg-yellow-400 text-slate-950 font-black py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all text-sm cursor-pointer"
            >
              <FileText className="w-5 h-5" />
              <span>Solicitar Cotización Web</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Subpage Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Details Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Image Gallery & Preview Banner */}
            <div className="space-y-4">
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400 shadow-2xl bg-neutral-950 group min-h-[300px] sm:min-h-[440px] flex items-center justify-center p-2">
                <img
                  key={activeImage}
                  src={activeImage}
                  alt={vehicle.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200';
                  }}
                  className="w-full max-h-[460px] object-contain transition-all duration-300 rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white pointer-events-none">
                  <span className="text-xs font-black uppercase text-amber-400 bg-black/90 px-3 py-1.5 rounded-lg border border-neutral-700 flex items-center gap-1.5 shadow">
                    <Camera className="w-3.5 h-3.5 text-amber-400" />
                    <span>Fotografía Real de Unidad</span>
                  </span>
                  <span className="text-xs font-bold text-neutral-300 bg-black/80 px-2.5 py-1 rounded-lg border border-neutral-800">
                    Recomendado para: {vehicle.recommendedFor}
                  </span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {galleryList.length > 1 && (
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400 block">
                    📸 Galería de Fotografías de Nuestra Flota ({galleryList.length} imágenes):
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {galleryList.map((imgUrl, index) => {
                      const isSelected = imgUrl === activeImage;
                      return (
                        <button
                          key={index}
                          onClick={() => setActiveImage(imgUrl)}
                          className={`relative rounded-2xl overflow-hidden border-2 transition-all h-24 sm:h-28 cursor-pointer group/thumb bg-neutral-950 p-1 flex items-center justify-center ${
                            isSelected
                              ? 'border-amber-400 ring-2 ring-amber-400/50 scale-[1.02]'
                              : 'border-neutral-800 opacity-70 hover:opacity-100 hover:border-neutral-600'
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`${vehicle.name} - ${index + 1}`}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200';
                            }}
                            className="w-full h-full object-contain rounded-xl group-hover/thumb:scale-105 transition-transform duration-300"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-amber-400/20 border-2 border-amber-400 rounded-2xl pointer-events-none" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Service Includes Section */}
            <div className="bg-neutral-900 rounded-3xl border border-neutral-800 p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="border-b border-neutral-800 pb-4">
                <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-extrabold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Detalles de Cobertura</span>
                </div>
                <h2 className="text-2xl font-black text-white">
                  {vehicle.serviceIncludesTitle || 'Lo Que Incluye Nuestro Servicio de Alquiler'}
                </h2>
                <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                  {vehicle.serviceIncludesDescription}
                </p>
              </div>

              {/* Includes Checklist Items */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <span>✅ Nuestro Servicio Incluye:</span>
                </h3>

                <div className="space-y-3">
                  {/* Item 1: Capacity */}
                  <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                      {inc?.unitCapacity || (
                        <span>
                          <strong className="text-white font-bold">Unidad de {vehicle.capacity}:</strong> Acceso a nuestra flota con capacidad garantizada de {vehicle.capacity}, con acabados superiores y confortable.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Item 2: Driver */}
                  <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                      {inc?.driver || (
                        <span>
                          <strong className="text-white font-bold">Conductor Profesional Certificado:</strong> Un conductor con experiencia en manejo, responsable y debidamente autorizado, con profundo conocimiento de las rutas y un enfoque en el servicio discreto y de alto nivel.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Item 3: Amenities */}
                  <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                      {inc?.amenities || (
                        <span>
                          <strong className="text-white font-bold">Comodidades Premium a Bordo:</strong> El servicio incluye aire acondicionado funcional, asientos confortables, y presentación impecable de la unidad, esenciales para el traslado.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Item 4: Maintenance */}
                  <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                      {inc?.maintenance || (
                        <span>
                          <strong className="text-white font-bold">Mantenimiento y Seguridad:</strong> Todos nuestros vehículos se entregan en óptimas condiciones mecánicas y de limpieza. El servicio incluye la cobertura de mantenimiento preventivo y correctivo de la unidad.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Item 5: Fuel Options */}
                  <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-2">
                    <div className="flex items-center gap-2 font-black text-amber-400 text-xs sm:text-sm">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                      <span>Combustible (Negociable / Especificar):</span>
                    </div>
                    <div className="pl-7 space-y-2 text-xs sm:text-sm text-neutral-300">
                      <p className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                        <strong className="text-amber-400 font-bold block mb-0.5">Opción 1 (Recomendada):</strong>
                        {inc?.fuelOption1 || 'No incluye combustible. La tarifa de alquiler cubre el vehículo y el conductor, y el cliente gestiona la provisión del combustible para sus rutas.'}
                      </p>
                      <p className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                        <strong className="text-white font-bold block mb-0.5">Opción 2 (Si lo incluyes):</strong>
                        {inc?.fuelOption2 || 'Combustible incluido dentro de las rutas y kilometraje acordados contractualmente.'}
                      </p>
                    </div>
                  </div>

                  {/* Item 6: Insurance */}
                  <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                      {inc?.insurance || (
                        <span>
                          <strong className="text-white font-bold">Seguros de Responsabilidad Civil:</strong> Las unidades cuentan con los seguros requeridos para la operación de transporte de pasajeros, brindando el máximo respaldo legal para su empresa e institución.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Item 7: Important Note */}
                  <div className="bg-amber-400/10 border border-amber-400/40 p-4 rounded-2xl flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-amber-200 leading-relaxed">
                      <strong className="text-amber-400 font-black block mb-1">💡 Nota Importante:</strong>
                      {inc?.importantNote || 'Los costos de peajes, entradas a parques, o cualquier gasto ajeno a la operación de la ruta estándar no están incluidos en la tarifa base y se gestionan por separado, a menos que se especifique lo contrario en el contrato.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipment & Amenities Grid */}
            <div className="bg-neutral-900 rounded-3xl border border-neutral-800 p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-black text-white">Equipamiento & Confort Integrado</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {vehicle.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-xs font-bold text-neutral-200 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-neutral-900 rounded-3xl border border-amber-400 p-6 space-y-5 shadow-2xl sticky top-36">
              <div className="border-b border-neutral-800 pb-4">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 block mb-1">
                  Atención Directa 24/7
                </span>
                <h3 className="text-xl font-black text-white">
                  ¿Listo para reservar {vehicle.name}?
                </h3>
                <p className="text-neutral-400 text-xs mt-1">
                  Atención inmediata para presupuestos de rutas, alquiler mensual o días específicos.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppQuote}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Cotizar en WhatsApp</span>
                </button>

                <button
                  onClick={() => onQuote(vehicle.name)}
                  className="w-full bg-amber-400 hover:bg-yellow-400 text-slate-950 font-black py-3.5 px-4 rounded-xl shadow-lg text-sm cursor-pointer"
                >
                  Completar Formulario Web
                </button>

                <a
                  href="tel:+50249616621"
                  className="w-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold py-3 px-4 rounded-xl border border-neutral-800 flex items-center justify-center gap-2 text-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Llamar: {WHATSAPP_NUMBER}</span>
                </a>
              </div>

              {/* Payment Methods */}
              <div className="pt-4 border-t border-neutral-800 space-y-2">
                <span className="text-[11px] font-black uppercase text-amber-400 block">
                  Aceptamos Tarjetas de Crédito y Débito:
                </span>
                <div className="flex items-center gap-2 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                  <VisaLogo className="h-6 w-auto" />
                  <MastercardLogo className="h-6 w-auto" />
                  <span className="text-[10px] font-bold text-neutral-300 pl-1">
                    Credomatic (3 a 18 cuotas)
                  </span>
                </div>
              </div>

              {/* Security Guarantee */}
              <div className="flex items-center gap-2 text-xs text-neutral-400 pt-1 font-semibold">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Respuesta y cotización en menos de 15 minutos</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section inside Subpage */}
        <div className="mt-16">
          <FaqSection onNavigate={() => onQuote(vehicle.name)} />
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { WHATSAPP_RAW, WHATSAPP_NUMBER } from '../data/transportData';

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    question: '¿Cuál es la capacidad de pasajeros de sus buses escolares?',
    answer:
      'Nuestra flota de buses escolares está diseñada para grupos grandes, ofreciendo capacidades que varían entre 44 y 48 pasajeros por unidad, asegurando que su grupo viaje unido y cómodo.',
  },
  {
    question: '¿Están equipados los buses con medidas de seguridad?',
    answer:
      'Sí. La seguridad es nuestra prioridad. Todos nuestros buses reciben mantenimiento riguroso y cumplen con las normativas para el transporte escolar y de menores, incluyendo cinturones de seguridad en todos los asientos.',
  },
  {
    question: '¿Qué tipo de mantenimiento reciben las unidades?',
    answer:
      'Realizamos programas de mantenimiento preventivo y correctivo de manera constante, garantizando que cada bus esté en óptimas condiciones mecánicas y de limpieza para cada servicio en Guatemala.',
  },
  {
    question: '¿Qué modalidades de alquiler ofrecen?',
    answer:
      'Ofrecemos dos modalidades flexibles: Alquiler Mensual (ideal para la cobertura de rutas escolares diarias) y Alquiler por Días Específicos (perfecto para excursiones, eventos deportivos o viajes puntuales).',
  },
  {
    question: '¿El servicio de alquiler incluye el conductor?',
    answer:
      'Sí, todas nuestras tarifas de alquiler incluyen un conductor profesional experimentado, capacitado y con conocimiento de las rutas en el territorio guatemalteco.',
  },
  {
    question: '¿El precio del alquiler incluye el combustible?',
    answer:
      'Generalmente, la tarifa base cubre el bus y el conductor. La gestión del combustible se establece claramente en el contrato, pudiendo ser suministrado por el cliente o incluido en la cotización dependiendo de la negociación y las rutas acordadas.',
  },
  {
    question: '¿Cómo puedo solicitar una cotización para mi escuela o evento?',
    answer:
      'Es muy fácil. Simplemente contáctenos a través de nuestro formulario en línea o llámenos, especificando la fecha, el número de pasajeros (44-48), y la ruta o destino en Guatemala.',
  },
];

interface FaqSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleWhatsAppClick = () => {
    const text = 'Hola MRS BUSES, tengo una consulta adicional sobre sus servicios de transporte.';
    window.open(`https://wa.me/${WHATSAPP_RAW}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 px-4 py-1.5 rounded-full text-amber-400 text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Resolvemos tus dudas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            ❓ Preguntas y Respuestas Frecuentes sobre MRS Bus (FAQ’s)
          </h2>

          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Aseguren un recorrido lleno de comodidad para todos los viajeros.
          </p>
        </div>

        {/* FAQ Accordions List */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-neutral-950 border-amber-400 shadow-xl'
                    : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white flex items-center gap-3">
                    <span className="text-amber-400 font-black text-sm bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20 shrink-0">
                      Q{index + 1}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <div
                    className={`p-2 rounded-xl border transition-transform duration-300 shrink-0 ${
                      isOpen
                        ? 'bg-amber-400 text-slate-950 border-amber-400 rotate-180'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-neutral-300 text-sm sm:text-base leading-relaxed border-t border-neutral-900 pt-4 animate-in fade-in duration-200">
                    <p className="pl-11">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Help Callout */}
        <div className="mt-12 bg-neutral-950 rounded-3xl border border-neutral-800 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-black text-white">¿Tienes otra pregunta que no aparece aquí?</h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Nuestro equipo de atención al cliente está listo para atenderte de forma personalizada.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleWhatsAppClick}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl shadow flex items-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Escribir por WhatsApp</span>
            </button>

            {onNavigate && (
              <button
                onClick={() => onNavigate('cotizacion')}
                className="bg-amber-400 hover:bg-yellow-400 text-slate-950 font-bold text-xs sm:text-sm px-4 py-3 rounded-xl shadow transition-all cursor-pointer"
              >
                Solicitar Cotización
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { QUOTE_SECTION_DATA, WHATSAPP_RAW, WHATSAPP_NUMBER } from '../data/transportData';
import { Send, Phone, MapPin, Clock, MessageCircle, CheckCircle2, Bus, Sparkles, Calendar } from 'lucide-react';

interface QuoteFormSectionProps {
  prefilledBusType?: string;
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({ prefilledBusType }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    vehiculo: 'County o Coaster (24 a 28 pax)',
    origen: '',
    destino: '',
    fechaSalida: '',
    fechaRegreso: '',
    pasajeros: '',
    detalles: '',
  });

  useEffect(() => {
    if (prefilledBusType) {
      setFormData((prev) => ({ ...prev, vehiculo: prefilledBusType }));
    }
  }, [prefilledBusType]);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    sendWhatsAppQuote();
  };

  const sendWhatsAppQuote = () => {
    const message = [
      `*SOLICITUD DE COTIZACIÓN - MRS BUSES*`,
      `------------------------------------`,
      ``,
      `*DATOS DEL CLIENTE:*`,
      `- *Nombre:* ${formData.nombre || 'No especificado'}`,
      `- *Teléfono:* ${formData.telefono || 'No especificado'}`,
      `- *Correo:* ${formData.correo || 'No especificado'}`,
      ``,
      `*UNIDAD REQUERIDA:*`,
      `- *Vehículo:* ${formData.vehiculo}`,
      `- *Pasajeros Estimados:* ${formData.pasajeros || 'Por definir'}`,
      ``,
      `*LOGÍSTICA DEL VIAJE:*`,
      `- *Lugar de Origen:* ${formData.origen || 'Por definir'}`,
      `- *Lugar de Destino:* ${formData.destino || 'Por definir'}`,
      `- *Fecha de Salida:* ${formData.fechaSalida || 'Por definir'}`,
      `- *Fecha de Regreso:* ${formData.fechaRegreso || 'Un solo viaje'}`,
      ``,
      `*DETALLES ADICIONALES:*`,
      `- ${formData.detalles || 'Sin observaciones adicionales'}`,
      ``,
      `------------------------------------`,
      `*Solicitud enviada desde mrsbuses.com*`
    ].join('\n');

    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_RAW}&text=${encodeURIComponent(message)}`, '_blank');
  };

  const vehicleOptions = [
    { label: 'Buses Escolares (44 a 48 pax)', id: 'bus-escolar', icon: '44-48 pax' },
    { label: 'County o Coaster (24 a 28 pax)', id: 'county-coaster', icon: '24-28 pax' },
    { label: 'Micro bus Estándar (7 a 15 pax)', id: 'microbus-estandar', icon: '7-15 pax' },
    { label: 'Mini Pullman (33 pax)', id: 'mini-pullman', icon: '33 pax' },
    { label: 'Línea ejecutiva (24 a 28 pax)', id: 'linea-ejecutiva', icon: '24-28 pax' },
  ];

  return (
    <section id="cotizacion" className="py-16 md:py-24 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 border border-amber-400/30">
            <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Cotización Inmediata</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {QUOTE_SECTION_DATA.titulo}
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto my-4 rounded-full" />
          <p className="text-neutral-300 text-base sm:text-lg">
            {QUOTE_SECTION_DATA.subtitulo}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-950 text-white rounded-3xl p-8 shadow-2xl border border-neutral-800">
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white">
                  Información de Contacto Directo
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {QUOTE_SECTION_DATA.descripcion}
                </p>

                <div className="space-y-4 pt-2">
                  <a
                    href={`https://wa.me/${WHATSAPP_RAW}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-neutral-900 hover:bg-neutral-800 p-4 rounded-2xl border border-neutral-800 hover:border-amber-400 transition-all group"
                  >
                    <div className="p-3 bg-amber-400 text-slate-950 rounded-xl font-bold">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">WhatsApp Principal</div>
                      <div className="text-lg font-black text-white group-hover:text-amber-400">{WHATSAPP_NUMBER}</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
                    <div className="p-3 bg-amber-400/20 text-amber-400 border border-amber-400/30 rounded-xl font-bold">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Atención Telefónica</div>
                      <div className="text-sm font-bold text-white">+502 4961-6621</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
                    <div className="p-3 bg-amber-400/20 text-amber-400 border border-amber-400/30 rounded-xl font-bold">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Sede Central</div>
                      <div className="text-sm font-bold text-white">Ciudad de Guatemala, Guatemala C.A.</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
                    <div className="p-3 bg-amber-400/20 text-amber-400 border border-amber-400/30 rounded-xl font-bold">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Horario de Atención</div>
                      <div className="text-sm font-bold text-white">Lunes a Domingo: 24 Horas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Quote Form */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-950 rounded-3xl p-8 border border-neutral-800 shadow-2xl text-white">
              {submitted ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-20 h-20 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-400/30">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    ¡Solicitud Lista para Enviar!
                  </h3>
                  <p className="text-neutral-300 text-sm max-w-md mx-auto">
                    Haz clic en el siguiente botón para enviar la información directamente a nuestro equipo por WhatsApp y recibir tu tarifa de inmediato.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={sendWhatsAppQuote}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-base cursor-pointer"
                    >
                      <span>💬 Enviar Cotización por WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-6 py-4 rounded-xl text-sm cursor-pointer"
                    >
                      Modificar Datos
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="border-b border-neutral-800 pb-3">
                    <h3 className="text-xl font-black text-white flex items-center gap-2">
                      <Bus className="w-5 h-5 text-amber-400" />
                      <span>Formulario de Cotización de Transporte</span>
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Elige el vehículo de tu interés y completa los datos clave
                    </p>
                  </div>

                  {/* Vehicle Selector Chips */}
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-amber-400 uppercase tracking-wider">
                      1. Selecciona la unidad deseada:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {vehicleOptions.map((v) => {
                        const isSelected = formData.vehiculo === v.label || formData.vehiculo.toLowerCase().includes(v.id.replace('-', ' '));
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, vehiculo: v.label })}
                            className={`p-2.5 rounded-xl text-left border transition-all text-xs font-bold flex flex-col justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-amber-400 text-slate-950 border-amber-400 font-black shadow-md'
                                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-amber-400/50'
                            }`}
                          >
                            <span className="truncate">{v.label.split('(')[0]}</span>
                            <span className="text-[10px] opacity-80 mt-1">{v.icon}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Juan Pérez"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 font-medium placeholder-neutral-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ej. 5555-5555"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 font-medium placeholder-neutral-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        placeholder="ejemplo@correo.com"
                        value={formData.correo}
                        onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 font-medium placeholder-neutral-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                        Tipo de Vehículo Seleccionado
                      </label>
                      <select
                        value={formData.vehiculo}
                        onChange={(e) => setFormData({ ...formData, vehiculo: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-amber-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 font-bold"
                      >
                        <option value="Buses Escolares (44 a 48 pax)">Buses Escolares (44 a 48 pax)</option>
                        <option value="County o Coaster (24 a 28 pax)">County o Coaster (24 a 28 pax)</option>
                        <option value="Micro bus Estándar (7 a 15 pax)">Micro bus Estándar (7 a 15 pax)</option>
                        <option value="Mini Pullman (33 pax)">Mini Pullman (33 pax)</option>
                        <option value="Línea ejecutiva (24 a 28 pax)">Línea ejecutiva (24 a 28 pax)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                        Lugar de Origen
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Ciudad de Guatemala"
                        value={formData.origen}
                        onChange={(e) => setFormData({ ...formData, origen: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium placeholder-neutral-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                        Lugar de Destino
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Antigua Guatemala / Panajachel"
                        value={formData.destino}
                        onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium placeholder-neutral-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>Fecha Salida</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.fechaSalida}
                          onChange={(e) => setFormData({ ...formData, fechaSalida: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-3 pr-10 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium [color-scheme:dark]"
                        />
                        <Calendar className="w-4 h-4 text-amber-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>Fecha Regreso</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.fechaRegreso}
                          onChange={(e) => setFormData({ ...formData, fechaRegreso: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-3 pr-10 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium [color-scheme:dark]"
                        />
                        <Calendar className="w-4 h-4 text-amber-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                        N° Pasajeros
                      </label>
                      <input
                        type="number"
                        placeholder="Ej. 25"
                        value={formData.pasajeros}
                        onChange={(e) => setFormData({ ...formData, pasajeros: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium placeholder-neutral-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                      Detalles o Requerimientos Especiales
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Escribe aquí cualquier solicitud adicional (A/C, maletero amplio, horas específicas, etc.)"
                      value={formData.detalles}
                      onChange={(e) => setFormData({ ...formData, detalles: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium placeholder-neutral-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 px-6 rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer text-base"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Solicitar Cotización por WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

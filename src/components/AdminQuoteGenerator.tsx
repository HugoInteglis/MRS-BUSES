import React, { useState, useRef } from 'react';
import {
  X,
  FileText,
  Download,
  Printer,
  Copy,
  Check,
  LogOut,
  Sparkles,
  Bus,
  Calendar,
  MapPin,
  Clock,
  User,
  DollarSign,
  ShieldCheck,
  Send,
  Building,
  RefreshCw,
  CheckSquare
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface AdminQuoteGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const AdminQuoteGenerator: React.FC<AdminQuoteGeneratorProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<'form' | 'preview'>('form');

  // Default state matching user sample
  const [quoteData, setQuoteData] = useState({
    quoteNumber: 'COT-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900),
    issueDate: new Date().toLocaleDateString('es-GT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    clientName: 'Estimado cliente:',
    passengerCount: '180 personas aproximadamente',
    vehicleUnits: '4 Bus Escolar',
    departureDate: '4 de septiembre 2,026',
    departureTime: '6:00 am',
    originLocation: 'INCA',
    destinationLocation: 'Jalapa',
    returnTime: '8:00 pm',
    serviceType: 'Únicamente ida y vuelta',
    includes: [
      'Piloto',
      'Combustible',
      'Peajes',
      'Parqueos',
      'Seguro de pasajeros',
    ],
    customInclusionsText: 'Piloto, combustible, peajes, y parqueos.',
    priceAmount: '10,400.00',
    currencySymbol: 'Q.',
    vatTaxLabel: 'iva incluido',
    availabilityNote: 'Sujeto a disponibilidad y modificación de precio si cambia la logística arriba indicada.',
    paymentTerms: 'Forma de pago por ser primera compra Contado posteriormente podríamos trabajar un crédito de 8 días.',
    closingText: 'Agradecemos su atención a la presente propuesta quedamos a la orden.',
    advisorName: 'Rodolfo Pérez',
    advisorRole: 'Asesor Comercial',
    advisorPhone: '4961-6621 / 3748-1106',
    showStamp: true,
  });

  if (!isOpen) return null;

  // Handle Download PDF via html2canvas + jsPDF
  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    setIsGeneratingPdf(true);

    try {
      const element = printRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 5;

      pdf.addImage(
        imgData,
        'JPEG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      const filename = `Cotizacion_MRS_Buses_${quoteData.quoteNumber}.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error('Error generando PDF:', err);
      alert('Hubo un error al generar el PDF. Puedes intentar usar la opción de "Imprimir / Guardar PDF".');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Handle native window print
  const handlePrint = () => {
    window.print();
  };

  // Handle Copy formatted text for WhatsApp
  const handleCopyWhatsApp = () => {
    const text = [
      `*COTIZACIÓN OFICIAL - MRS BUSES BY BERAKAH*`,
      `*Folio:* ${quoteData.quoteNumber} | *Fecha:* ${quoteData.issueDate}`,
      `------------------------------------`,
      `*Estimado(a):* ${quoteData.clientName}`,
      ``,
      `Es un gusto saludarle. Presentamos la propuesta para su viaje:`,
      ``,
      `🚌 *DETALLES DEL SERVICIO:*`,
      `- *Pasajeros:* ${quoteData.passengerCount}`,
      `- *Unidades:* ${quoteData.vehicleUnits}`,
      `- *Logística:* Salida el ${quoteData.departureDate} desde ${quoteData.originLocation} a las ${quoteData.departureTime}, hacia ${quoteData.destinationLocation}, retornando el mismo día a las ${quoteData.returnTime}. (${quoteData.serviceType})`,
      ``,
      `✅ *INCLUYE:* ${quoteData.customInclusionsText}`,
      ``,
      `💰 *PRECIO TOTAL:* ${quoteData.currencySymbol} ${quoteData.priceAmount} (${quoteData.vatTaxLabel})`,
      ``,
      `📌 *NOTAS & CONDICIONES:*`,
      `- ${quoteData.availabilityNote}`,
      `- ${quoteData.paymentTerms}`,
      ``,
      `*Atentamente,*`,
      `${quoteData.advisorName} - ${quoteData.advisorRole}`,
      `📞 Teléfono / WhatsApp: ${quoteData.advisorPhone}`,
      `🌐 www.mrsbuses.com`
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const availableInclusions = [
    'Piloto',
    'Combustible',
    'Peajes',
    'Parqueos',
    'Viáticos de piloto',
    'Seguro de pasajeros',
    'Aire acondicionado',
  ];

  const toggleInclusion = (item: string) => {
    let updated = [...quoteData.includes];
    if (updated.includes(item)) {
      updated = updated.filter((i) => i !== item);
    } else {
      updated.push(item);
    }
    setQuoteData({
      ...quoteData,
      includes: updated,
      customInclusionsText: updated.join(', ') + '.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-neutral-950/90 backdrop-blur-md overflow-hidden animate-fade-in print:bg-white print:p-0 print:overflow-visible">
      {/* Printable CSS overrides */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #quote-printable-document, #quote-printable-document * {
            visibility: visible;
          }
          #quote-printable-document {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>

      {/* Top Admin Action Bar */}
      <header className="bg-neutral-900 border-b border-neutral-800 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-white shrink-0 print:hidden">
        <div className="flex items-center gap-3">
          <div className="bg-amber-400 text-slate-950 p-2 rounded-xl font-black shadow-md flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black flex items-center gap-2">
              <span>Cotizador Oficial MRS BUSES</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30">
                PRO
              </span>
            </h2>
            <p className="text-xs text-neutral-400">
              Genera cotizaciones profesionales listas para imprimir o enviar en PDF.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyWhatsApp}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black py-2 px-3.5 rounded-xl transition-all shadow flex items-center gap-1.5 cursor-pointer"
            title="Copiar formato de texto para WhatsApp"
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '¡Copiado!' : 'Copiar p/ WhatsApp'}</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPdf}
            className="bg-amber-400 hover:bg-yellow-400 text-slate-950 text-xs font-black py-2 px-3.5 rounded-xl transition-all shadow flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Descargar archivo PDF"
          >
            <Download className="w-4 h-4" />
            <span>{isGeneratingPdf ? 'Generando...' : 'Descargar PDF'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold py-2 px-3.5 rounded-xl border border-neutral-700 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Imprimir o Guardar como PDF del sistema"
          >
            <Printer className="w-4 h-4 text-neutral-300" />
            <span>Imprimir</span>
          </button>

          <div className="h-6 w-px bg-neutral-800 mx-1 hidden sm:block"></div>

          <button
            onClick={onLogout}
            className="text-neutral-400 hover:text-red-400 p-2 rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer text-xs flex items-center gap-1"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Salir</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-xl transition-colors cursor-pointer"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Selector Bar */}
      <div className="lg:hidden bg-neutral-900 border-b border-neutral-800 px-4 py-2 flex items-center justify-center gap-2 shrink-0 print:hidden">
        <button
          onClick={() => setActiveMobileTab('form')}
          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeMobileTab === 'form'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'bg-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>1. Llenar Datos</span>
        </button>
        <button
          onClick={() => setActiveMobileTab('preview')}
          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeMobileTab === 'preview'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'bg-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>2. Vista Previa</span>
        </button>
      </div>

      {/* Main Container - Split View (Form Editor + Live Document) */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-neutral-950 print:block print:overflow-visible">
        
        {/* Left Side: Interactive Form Controls (Hidden on Print) */}
        <div className={`lg:col-span-5 border-r border-neutral-800 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs text-white print:hidden ${
          activeMobileTab === 'form' ? 'block' : 'hidden lg:block'
        }`}>
          
          {/* Section 1: Metadata */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-3">
            <h3 className="font-black text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5" />
              <span>1. Datos del Cliente y Folio</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 font-bold mb-1">N° / Folio Cotización</label>
                <input
                  type="text"
                  value={quoteData.quoteNumber}
                  onChange={(e) => setQuoteData({ ...quoteData, quoteNumber: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-neutral-400 font-bold mb-1">Fecha Emisión</label>
                <input
                  type="text"
                  value={quoteData.issueDate}
                  onChange={(e) => setQuoteData({ ...quoteData, issueDate: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-bold"
                />
              </div>
            </div>
            <div>
              <label className="block text-neutral-400 font-bold mb-1">Cliente / Empresa Receptora</label>
              <input
                type="text"
                value={quoteData.clientName}
                onChange={(e) => setQuoteData({ ...quoteData, clientName: e.target.value })}
                placeholder="ej. Estimado cliente: / Liceo Javier"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-bold"
              />
            </div>
          </div>

          {/* Section 2: Transport & Units */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-3">
            <h3 className="font-black text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Bus className="w-3.5 h-3.5" />
              <span>2. Capacidad y Unidades</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 font-bold mb-1">Pasajeros Estimados</label>
                <input
                  type="text"
                  value={quoteData.passengerCount}
                  onChange={(e) => setQuoteData({ ...quoteData, passengerCount: e.target.value })}
                  placeholder="ej. 180 personas aprox."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-neutral-400 font-bold mb-1">Unidades / Flota</label>
                <input
                  type="text"
                  value={quoteData.vehicleUnits}
                  onChange={(e) => setQuoteData({ ...quoteData, vehicleUnits: e.target.value })}
                  placeholder="ej. 4 Bus Escolar"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-bold"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Logistics */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-3">
            <h3 className="font-black text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>3. Logística del Viaje</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 font-bold mb-1">Lugar Origen</label>
                <input
                  type="text"
                  value={quoteData.originLocation}
                  onChange={(e) => setQuoteData({ ...quoteData, originLocation: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-neutral-400 font-bold mb-1">Lugar Destino</label>
                <input
                  type="text"
                  value={quoteData.destinationLocation}
                  onChange={(e) => setQuoteData({ ...quoteData, destinationLocation: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 font-bold mb-1">Fecha del Viaje</label>
                <input
                  type="text"
                  value={quoteData.departureDate}
                  onChange={(e) => setQuoteData({ ...quoteData, departureDate: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-neutral-400 font-bold mb-1">Tipo de Servicio</label>
                <input
                  type="text"
                  value={quoteData.serviceType}
                  onChange={(e) => setQuoteData({ ...quoteData, serviceType: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 font-bold mb-1">Hora Salida</label>
                <input
                  type="text"
                  value={quoteData.departureTime}
                  onChange={(e) => setQuoteData({ ...quoteData, departureTime: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-neutral-400 font-bold mb-1">Hora Retorno Aprox.</label>
                <input
                  type="text"
                  value={quoteData.returnTime}
                  onChange={(e) => setQuoteData({ ...quoteData, returnTime: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-bold"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Inclusions & Price */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-3">
            <h3 className="font-black text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" />
              <span>4. Inclusiones y Precio Total</span>
            </h3>

            <div>
              <label className="block text-neutral-400 font-bold mb-2">Inclusiones Rápida Selección:</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {availableInclusions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleInclusion(item)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                      quoteData.includes.includes(item)
                        ? 'bg-amber-400 text-slate-950 border-amber-400'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={quoteData.customInclusionsText}
                onChange={(e) => setQuoteData({ ...quoteData, customInclusionsText: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-bold"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="col-span-2">
                <label className="block text-neutral-400 font-bold mb-1">Monto Total (Quetzales)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-amber-400">Q.</span>
                  <input
                    type="text"
                    value={quoteData.priceAmount}
                    onChange={(e) => setQuoteData({ ...quoteData, priceAmount: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 pl-8 text-white font-black text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-neutral-400 font-bold mb-1">Leyenda IVA</label>
                <input
                  type="text"
                  value={quoteData.vatTaxLabel}
                  onChange={(e) => setQuoteData({ ...quoteData, vatTaxLabel: e.target.value })}
                  placeholder="iva incluido"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-bold"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Conditions & Adviser */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-3">
            <h3 className="font-black text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>5. Condiciones y Asesor</span>
            </h3>
            <div>
              <label className="block text-neutral-400 font-bold mb-1">Forma de Pago</label>
              <textarea
                rows={2}
                value={quoteData.paymentTerms}
                onChange={(e) => setQuoteData({ ...quoteData, paymentTerms: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-bold resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 font-bold mb-1">Nombre Asesor</label>
                <input
                  type="text"
                  value={quoteData.advisorName}
                  onChange={(e) => setQuoteData({ ...quoteData, advisorName: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-neutral-400 font-bold mb-1">Teléfonos Contacto</label>
                <input
                  type="text"
                  value={quoteData.advisorPhone}
                  onChange={(e) => setQuoteData({ ...quoteData, advisorPhone: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white font-bold"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: High-Resolution Printable Document Canvas */}
        <div className={`lg:col-span-7 bg-neutral-900/60 overflow-y-auto p-3 sm:p-8 flex flex-col items-center justify-start print:p-0 print:bg-white print:overflow-visible ${
          activeMobileTab === 'preview' ? 'block' : 'hidden lg:block'
        }`}>
          
          {/* Mobile Helper Info */}
          <div className="w-full max-w-[800px] mb-3 flex items-center justify-between text-[11px] text-neutral-400 bg-neutral-900/90 border border-neutral-800 rounded-xl px-3 py-2 print:hidden">
            <span className="font-semibold flex items-center gap-1.5 text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vista Previa del Documento</span>
            </span>
            <span className="text-neutral-400 font-medium">Documento Oficial</span>
          </div>

          <div className="w-full max-w-[800px] flex justify-center pb-12 print:pb-0">
            <div
              id="quote-printable-document"
              ref={printRef}
              className="w-full bg-white text-slate-900 shadow-2xl rounded-2xl p-4 sm:p-10 border border-slate-200 space-y-6 sm:space-y-8 font-sans leading-relaxed relative text-xs sm:text-sm print:shadow-none print:border-none print:rounded-none print:p-6"
            >
            {/* Watermark / Background Accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 rounded-bl-full pointer-events-none print:hidden"></div>

            {/* Document Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b-2 border-slate-900/10 pb-6">
              <div className="flex items-center gap-4">
                {/* Official Logo */}
                <div className="flex items-center">
                  <img
                    src="https://i.ibb.co/r21S20yh/Logo-MRS-BUSES.png"
                    alt="MRS BUSES BY BERAKAH"
                    referrerPolicy="no-referrer"
                    className="h-20 sm:h-24 w-auto object-contain"
                  />
                </div>

                <div className="pl-3 border-l-2 border-amber-400">
                  <h1 className="text-2xl sm:text-3xl font-black text-indigo-950 italic tracking-tight font-serif">
                    Transporte y Buses Berakah
                  </h1>
                  <span className="text-xs text-slate-600 font-bold block">
                    Servicios Integrales de Alquiler de Transporte en Guatemala
                  </span>
                </div>
              </div>

              {/* Document Metadata Box */}
              <div className="text-right sm:self-center bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="block font-black text-amber-600 text-xs uppercase tracking-widest">COTIZACIÓN OFICIAL</span>
                <span className="block text-slate-950 font-black text-base">{quoteData.quoteNumber}</span>
                <span className="block text-[11px] text-slate-500 font-medium">{quoteData.issueDate}</span>
              </div>
            </div>

            {/* Greeting */}
            <div className="space-y-3">
              <div className="font-bold text-slate-900 text-base">
                {quoteData.clientName}
              </div>
              <p className="text-slate-700 leading-relaxed text-sm">
                Es un gusto poder saludarlos. Le presentamos la propuesta para su viaje:
              </p>
            </div>

            {/* Proposal Details Box / Structured Narrative */}
            <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5 print:hidden">
                  <Bus className="w-5 h-5" />
                </div>
                <div className="text-slate-800 leading-relaxed text-sm">
                  Servicio de transporte para <strong className="text-slate-950 font-black bg-amber-100/60 px-1 py-0.5 rounded">{quoteData.passengerCount}</strong> en <strong className="text-slate-950 font-black bg-amber-100/60 px-1 py-0.5 rounded">{quoteData.vehicleUnits}</strong> con la siguiente logística: saliendo el <strong className="text-slate-950 font-black">{quoteData.departureDate}</strong> saliendo de <strong className="text-slate-950 font-black">{quoteData.originLocation}</strong> a las <strong className="text-slate-950 font-black">{quoteData.departureTime}</strong>, aprox. hacia <strong className="text-slate-950 font-black">{quoteData.destinationLocation}</strong> retornando el mismo día aproximadamente a las <strong className="text-slate-950 font-black">{quoteData.returnTime}</strong>, al mismo lugar de inicio. <span className="font-extrabold text-slate-900">{quoteData.serviceType}.</span>
                </div>
              </div>

              {/* Inclusions Row */}
              <div className="pt-3 border-t border-slate-200 flex items-start gap-2 text-xs text-slate-800">
                <span className="font-black text-slate-950 shrink-0">El servicio de transporte incluye:</span>
                <span className="font-bold text-slate-700">{quoteData.customInclusionsText}</span>
              </div>
            </div>

            {/* Highlighted Price Box (Matches exact box in sample image) */}
            <div className="py-2 flex justify-center">
              <div className="border-2 border-slate-900 bg-white px-10 py-5 rounded-xl text-center shadow-md min-w-[260px]">
                <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  {quoteData.currencySymbol} {quoteData.priceAmount}
                </div>
                <div className="text-xs font-bold text-slate-600 lowercase tracking-wider mt-0.5">
                  {quoteData.vatTaxLabel}
                </div>
              </div>
            </div>

            {/* Terms & Conditions Notes */}
            <div className="space-y-2 text-xs text-slate-700 bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
              <p>
                <strong className="text-slate-950 font-black">Nota:</strong> {quoteData.availabilityNote}
              </p>
              <p>
                <strong className="text-slate-950 font-black">Forma de pago:</strong> {quoteData.paymentTerms}
              </p>
            </div>

            {/* Closing text */}
            <div className="text-xs text-slate-800 font-medium">
              {quoteData.closingText}
            </div>

            {/* Sign-off & Official Stamp */}
            <div className="pt-6 border-t border-slate-200">
              <div className="text-xs font-bold text-slate-600 mb-2">Atentamente,</div>
              
              {/* Signature and Stamp side by side */}
              <div className="flex items-end gap-3 my-2">
                <img
                  src="https://i.ibb.co/5gJB3J1Q/Captura-de-pantalla-2026-08-11-a-las-18-29-01.png"
                  alt="Firma Rodolfo Pérez"
                  referrerPolicy="no-referrer"
                  className="h-16 w-auto object-contain"
                />

                {quoteData.showStamp && (
                  <img
                    src="https://i.ibb.co/d4HgCSBn/Captura-de-pantalla-2026-08-11-a-las-18-28-27.png"
                    alt="Sello Oficial MRS BUSES"
                    referrerPolicy="no-referrer"
                    className="w-24 sm:w-28 h-auto object-contain mix-blend-multiply"
                  />
                )}
              </div>

              {/* Adviser details */}
              <div className="space-y-0.5">
                <div className="font-black text-slate-950 text-base">{quoteData.advisorName}</div>
                <div className="text-xs font-bold text-amber-700">{quoteData.advisorRole}</div>
                <div className="text-xs text-slate-600 font-semibold">
                  Celular: {quoteData.advisorPhone}
                </div>
              </div>
            </div>

            {/* Document Footer */}
            <div className="pt-8 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <div>1</div>
              <div className="font-bold text-slate-700">
                www.mrsbuses.com &nbsp;|&nbsp; teléfonos de contactos 4961-6621 / 3748-1106
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
);
};

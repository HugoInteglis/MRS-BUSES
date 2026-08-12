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
    customStampUrl: '',
  });

  if (!isOpen) return null;

  // Helper to convert oklch/oklab/lab/lch/color CSS strings to rgb/rgba format for html2canvas compatibility
  const modernColorToRgb = (colorStr: string): string => {
    try {
      if (typeof document !== 'undefined') {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#000000';
          ctx.fillStyle = colorStr;
          if (
            ctx.fillStyle &&
            ctx.fillStyle !== '#000000' &&
            !/(oklch|oklab|lab|lch|color)/i.test(ctx.fillStyle)
          ) {
            return ctx.fillStyle;
          }
        }
      }

      if (/oklab/i.test(colorStr)) {
        const match = colorStr.match(/oklab\(\s*([\d.\-+%]+)[,\s]+([\d.\-+%]+)[,\s]+([\d.\-+%]+)(?:[,\s\/]+([\d.\-+%]+))?\s*\)/i);
        if (match) {
          let L = match[1].endsWith('%') ? parseFloat(match[1]) / 100 : parseFloat(match[1]);
          let a = parseFloat(match[2]);
          let b = parseFloat(match[3]);
          let A = match[4] ? (match[4].endsWith('%') ? parseFloat(match[4]) / 100 : parseFloat(match[4])) : 1;

          if (isNaN(L)) L = 0;
          if (isNaN(a)) a = 0;
          if (isNaN(b)) b = 0;
          if (isNaN(A)) A = 1;

          const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
          const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
          const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

          const l = Math.max(0, l_) ** 3;
          const m = Math.max(0, m_) ** 3;
          const s = Math.max(0, s_) ** 3;

          const rLin = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
          const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
          const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

          const gamma = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(Math.max(0, c), 1 / 2.4) - 0.055);

          const R = Math.min(255, Math.max(0, Math.round(gamma(rLin) * 255)));
          const G = Math.min(255, Math.max(0, Math.round(gamma(gLin) * 255)));
          const B = Math.min(255, Math.max(0, Math.round(gamma(bLin) * 255)));

          if (A < 1) {
            return `rgba(${R}, ${G}, ${B}, ${A.toFixed(2)})`;
          }
          return `rgb(${R}, ${G}, ${B})`;
        }
      }

      if (/oklch/i.test(colorStr)) {
        const match = colorStr.match(/oklch\(\s*([\d.\-+%]+)[,\s]+([\d.\-+%]+)[,\s]+([\d.\-+%]+)(?:[,\s\/]+([\d.\-+%]+))?\s*\)/i);
        if (match) {
          let L = match[1].endsWith('%') ? parseFloat(match[1]) / 100 : parseFloat(match[1]);
          let C = match[2].endsWith('%') ? parseFloat(match[2]) / 100 : parseFloat(match[2]);
          let H = match[3].endsWith('%') ? (parseFloat(match[3]) * 360) / 100 : parseFloat(match[3]);
          let A = match[4] ? (match[4].endsWith('%') ? parseFloat(match[4]) / 100 : parseFloat(match[4])) : 1;

          if (isNaN(L)) L = 0;
          if (isNaN(C)) C = 0;
          if (isNaN(H)) H = 0;
          if (isNaN(A)) A = 1;

          const hRad = (H * Math.PI) / 180;
          const a = C * Math.cos(hRad);
          const b = C * Math.sin(hRad);

          const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
          const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
          const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

          const l = Math.max(0, l_) ** 3;
          const m = Math.max(0, m_) ** 3;
          const s = Math.max(0, s_) ** 3;

          const rLin = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
          const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
          const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

          const gamma = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(Math.max(0, c), 1 / 2.4) - 0.055);

          const R = Math.min(255, Math.max(0, Math.round(gamma(rLin) * 255)));
          const G = Math.min(255, Math.max(0, Math.round(gamma(gLin) * 255)));
          const B = Math.min(255, Math.max(0, Math.round(gamma(bLin) * 255)));

          if (A < 1) {
            return `rgba(${R}, ${G}, ${B}, ${A.toFixed(2)})`;
          }
          return `rgb(${R}, ${G}, ${B})`;
        }
      }

      return '#000000';
    } catch (e) {
      return '#000000';
    }
  };

  // Handle Download PDF via html2canvas + jsPDF with base64/local image safety
  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    setIsGeneratingPdf(true);

    try {
      const element = printRef.current;

      // Ensure all images are fully loaded before capturing canvas
      const images = Array.from(element.querySelectorAll('img'));
      await Promise.all(
        images.map(
          (imgElement) =>
            new Promise<void>((resolve) => {
              const img = imgElement as HTMLImageElement;
              if (img.complete && img.naturalWidth !== 0) {
                resolve();
              } else {
                img.onload = () => resolve();
                img.onerror = () => resolve();
              }
            })
        )
      );

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1024,
        onclone: (clonedDoc) => {
          if (clonedDoc.body) {
            clonedDoc.body.style.width = '1024px';
          }

          const colorRegex = /(oklch|oklab|lab|lch|color)\([^)]+\)/gi;

          // 1. Sanitize all <style> elements in cloned document
          const styles = Array.from(clonedDoc.querySelectorAll('style'));
          styles.forEach((style) => {
            if (style.textContent && colorRegex.test(style.textContent)) {
              style.textContent = style.textContent.replace(colorRegex, (match) =>
                modernColorToRgb(match)
              );
            }
          });

          // 2. Sanitize all elements with inline style containing modern colors
          const allEls = Array.from(clonedDoc.querySelectorAll('*'));
          allEls.forEach((el) => {
            const htmlEl = el as HTMLElement;
            if (htmlEl.style && htmlEl.style.cssText && colorRegex.test(htmlEl.style.cssText)) {
              htmlEl.style.cssText = htmlEl.style.cssText.replace(colorRegex, (match) =>
                modernColorToRgb(match)
              );
            }
          });

          // 3. For the target printable element and its children, enforce fixed A4 794px width & sanitize computed colors
          const printableEl = clonedDoc.getElementById('quote-printable-document');
          if (printableEl) {
            printableEl.style.width = '794px';
            printableEl.style.minWidth = '794px';
            printableEl.style.maxWidth = '794px';
            printableEl.style.padding = '36px';
            printableEl.style.boxSizing = 'border-box';
            printableEl.style.margin = '0 auto';
            printableEl.style.background = '#ffffff';
            printableEl.style.boxShadow = 'none';
            printableEl.style.border = 'none';
            printableEl.style.borderRadius = '0';

            const printableEls = [printableEl, ...Array.from(printableEl.querySelectorAll('*'))];
            printableEls.forEach((el) => {
              const htmlEl = el as HTMLElement;
              const computed = window.getComputedStyle(htmlEl);
              const colorProps: (keyof CSSStyleDeclaration)[] = [
                'color',
                'backgroundColor',
                'borderColor',
                'outlineColor',
              ];
              colorProps.forEach((prop) => {
                const val = computed[prop] as string;
                if (val && typeof val === 'string' && colorRegex.test(val)) {
                  (htmlEl.style as any)[prop] = val.replace(colorRegex, (match) =>
                    modernColorToRgb(match)
                  );
                }
              });
            });
          }
        },
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.88);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

      const margin = 8;
      const printableWidth = pdfWidth - margin * 2; // 194mm
      const maxAvailableHeight = pdfHeight - margin * 2; // 281mm

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = printableWidth / imgWidth;

      let renderWidth = printableWidth;
      let renderHeight = imgHeight * ratio;

      // If document height exceeds single page height, scale down so it fits on EXACTLY 1 PAGE
      if (renderHeight > maxAvailableHeight) {
        const scaleFactor = maxAvailableHeight / renderHeight;
        renderHeight = maxAvailableHeight;
        renderWidth = renderWidth * scaleFactor;
      }

      const xPos = margin + (printableWidth - renderWidth) / 2;

      pdf.addImage(
        imgData,
        'JPEG',
        xPos,
        margin,
        renderWidth,
        renderHeight,
        undefined,
        'FAST'
      );

      const filename = `Cotizacion_MRS_Buses_${quoteData.quoteNumber}.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error('Error generando PDF:', err);
      // Fallback: trigger print dialog if html2canvas fails
      window.print();
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
    <div className="admin-quote-modal-root fixed inset-0 z-50 flex flex-col bg-neutral-950/90 backdrop-blur-md overflow-hidden animate-fade-in print:bg-white print:p-0 print:overflow-visible">
      {/* Printable CSS overrides */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }

          /* Hide absolutely everything in body except the active admin quote modal */
          body > *:not(.admin-quote-modal-root) {
            display: none !important;
          }

          /* Ensure modal root fills page cleanly */
          .admin-quote-modal-root {
            position: absolute !important;
            inset: 0 !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: hidden !important;
            display: block !important;
          }

          /* Hide header bar, form editor, mobile switcher */
          .print\:hidden {
            display: none !important;
          }

          /* Hide left form column */
          .admin-quote-modal-root .border-r {
            display: none !important;
          }

          .quote-preview-container {
            display: block !important;
            position: absolute !important;
            inset: 0 !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            background: #ffffff !important;
            overflow: hidden !important;
          }

          #quote-printable-document {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            max-width: 210mm !important;
            height: auto !important;
            max-height: 297mm !important;
            margin: 0 auto !important;
            padding: 10mm 12mm !important;
            box-shadow: none !important;
            border: none !important;
            background: #ffffff !important;
            color: #000000 !important;
            border-radius: 0 !important;
            page-break-before: avoid !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            box-sizing: border-box !important;
          }

          html, body {
            background: #ffffff !important;
            color: #000000 !important;
            height: 100% !important;
            max-height: 100% !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
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

            {/* Stamp Options */}
            <div className="pt-2 border-t border-neutral-800 space-y-2">
              <label className="flex items-center gap-2 text-neutral-300 font-bold text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={quoteData.showStamp}
                  onChange={(e) => setQuoteData({ ...quoteData, showStamp: e.target.checked })}
                  className="w-4 h-4 rounded border-neutral-700 bg-neutral-950 text-amber-400 focus:ring-amber-400"
                />
                <span>Incluir Sello Oficial en la Cotización</span>
              </label>

              {quoteData.showStamp && (
                <div className="flex items-center gap-2 pt-1">
                  <label className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-bold cursor-pointer transition-colors">
                    {quoteData.customStampUrl ? '✓ Sello personalizado cargado (Cambiar)' : 'Subir foto de sello propio'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setQuoteData({ ...quoteData, customStampUrl: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  {quoteData.customStampUrl && (
                    <button
                      type="button"
                      onClick={() => setQuoteData({ ...quoteData, customStampUrl: '' })}
                      className="text-xs text-rose-400 hover:underline font-semibold"
                    >
                      Restablecer sello oficial
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Side: High-Resolution Printable Document Canvas */}
        <div className={`quote-preview-container lg:col-span-7 bg-neutral-900/60 overflow-y-auto p-3 sm:p-8 flex flex-col items-center justify-start print:p-0 print:bg-white print:overflow-visible ${
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

          <div className="w-full max-w-[800px] flex justify-center pb-12 print:pb-0 overflow-x-auto">
            <div
              id="quote-printable-document"
              ref={printRef}
              className="w-full bg-white text-slate-900 shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200 space-y-6 font-sans leading-relaxed relative text-sm print:shadow-none print:border-none print:rounded-none print:p-0 print:space-y-3.5 print:text-xs"
            >
            {/* Document Header */}
            <div className="flex flex-row items-center justify-between gap-4 border-b-2 border-slate-200 pb-6 print:pb-3 print:gap-3">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Official Logo */}
                <div className="flex items-center shrink-0">
                  <img
                    src="/logo-mrs.png"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://i.ibb.co/r21S20yh/Logo-MRS-BUSES.png";
                    }}
                    alt="MRS BUSES BY BERAKAH"
                    crossOrigin="anonymous"
                    className="h-20 sm:h-24 print:h-16 w-auto object-contain"
                  />
                </div>

                <div className="pl-3 border-l-2 border-amber-500">
                  <h1 className="text-xl sm:text-2xl print:text-xl font-black text-indigo-950 italic tracking-tight font-serif">
                    Transporte y Buses Berakah
                  </h1>
                  <span className="text-[11px] sm:text-xs print:text-[10px] text-slate-600 font-bold block">
                    Servicios Integrales de Alquiler de Transporte en Guatemala
                  </span>
                </div>
              </div>

              {/* Document Metadata Box */}
              <div className="text-right bg-slate-100/70 p-3 print:p-2 rounded-xl border border-slate-200 shrink-0">
                <span className="block font-black text-amber-600 text-xs print:text-[10px] uppercase tracking-widest">COTIZACIÓN OFICIAL</span>
                <span className="block text-slate-950 font-black text-base print:text-sm">{quoteData.quoteNumber}</span>
                <span className="block text-[11px] print:text-[10px] text-slate-500 font-medium">{quoteData.issueDate}</span>
              </div>
            </div>

            {/* Greeting */}
            <div className="space-y-3 print:space-y-1">
              <div className="font-bold text-slate-900 text-base print:text-sm">
                {quoteData.clientName}
              </div>
              <p className="text-slate-700 leading-relaxed text-sm print:text-xs">
                Es un gusto poder saludarlos. Le presentamos la propuesta para su viaje:
              </p>
            </div>

            {/* Proposal Details Box / Structured Narrative */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 print:p-3 space-y-4 print:space-y-2">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5 print:hidden">
                  <Bus className="w-5 h-5" />
                </div>
                <div className="text-slate-800 leading-relaxed text-sm print:text-xs">
                  Servicio de transporte para <strong className="text-slate-950 font-black">{quoteData.passengerCount}</strong> en <strong className="text-slate-950 font-black">{quoteData.vehicleUnits}</strong> con la siguiente logística: saliendo el <strong className="text-slate-950 font-black">{quoteData.departureDate}</strong> saliendo de <strong className="text-slate-950 font-black">{quoteData.originLocation}</strong> a las <strong className="text-slate-950 font-black">{quoteData.departureTime}</strong>, aprox. hacia <strong className="text-slate-950 font-black">{quoteData.destinationLocation}</strong> retornando el mismo día aproximadamente a las <strong className="text-slate-950 font-black">{quoteData.returnTime}</strong>, al mismo lugar de inicio. <span className="font-extrabold text-slate-900">{quoteData.serviceType}.</span>
                </div>
              </div>

              {/* Inclusions Row */}
              <div className="pt-3 print:pt-1 border-t border-slate-200 flex items-start gap-2 text-xs print:text-[11px] text-slate-800">
                <span className="font-black text-slate-950 shrink-0">El servicio de transporte incluye:</span>
                <span className="font-bold text-slate-700">{quoteData.customInclusionsText}</span>
              </div>
            </div>

            {/* Highlighted Price Box */}
            <div className="py-2 print:py-1 flex justify-center">
              <div className="border-2 border-slate-900 bg-white px-10 py-5 print:px-8 print:py-3 rounded-xl text-center shadow-sm min-w-[260px]">
                <div className="text-2xl sm:text-3xl print:text-xl font-black text-slate-950 tracking-tight">
                  {quoteData.currencySymbol} {quoteData.priceAmount}
                </div>
                <div className="text-xs print:text-[10px] font-bold text-slate-600 lowercase tracking-wider mt-0.5">
                  {quoteData.vatTaxLabel}
                </div>
              </div>
            </div>

            {/* Terms & Conditions Notes */}
            <div className="space-y-2 print:space-y-1 text-xs print:text-[11px] text-slate-700 bg-slate-50 p-4 print:p-2.5 rounded-xl border border-slate-200">
              <p>
                <strong className="text-slate-950 font-black">Nota:</strong> {quoteData.availabilityNote}
              </p>
              <p>
                <strong className="text-slate-950 font-black">Forma de pago:</strong> {quoteData.paymentTerms}
              </p>
            </div>

            {/* Closing text */}
            <div className="text-xs print:text-[11px] text-slate-800 font-medium">
              {quoteData.closingText}
            </div>

            {/* Sign-off & Official Stamp */}
            <div className="pt-6 print:pt-3 border-t border-slate-200">
              <div className="text-xs print:text-[11px] font-bold text-slate-600 mb-1">Atentamente,</div>
              
              {/* Signature and Stamp side by side */}
              <div className="flex items-end gap-3 my-1">
                <img
                  src="/firma-rodolfo.png"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://i.ibb.co/5gJB3J1Q/Captura-de-pantalla-2026-08-11-a-las-18-29-01.png";
                  }}
                  alt="Firma Rodolfo Pérez"
                  crossOrigin="anonymous"
                  className="h-16 print:h-12 w-auto object-contain"
                />

                {quoteData.showStamp && (
                  <img
                    src={quoteData.customStampUrl || "/sello-mrs.svg"}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/sello-mrs.png";
                    }}
                    alt="Sello Oficial MRS BUSES"
                    className="w-24 sm:w-28 print:w-20 h-auto object-contain mix-blend-multiply opacity-90"
                  />
                )}
              </div>

              {/* Adviser details */}
              <div className="space-y-0.5">
                <div className="font-black text-slate-950 text-base print:text-sm">{quoteData.advisorName}</div>
                <div className="text-xs print:text-[10px] font-bold text-amber-700">{quoteData.advisorRole}</div>
                <div className="text-xs print:text-[10px] text-slate-600 font-semibold">
                  Celular: {quoteData.advisorPhone}
                </div>
              </div>
            </div>

            {/* Document Footer */}
            <div className="pt-6 print:pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] print:text-[10px] text-slate-500 font-medium">
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

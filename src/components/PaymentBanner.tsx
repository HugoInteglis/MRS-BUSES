import React from 'react';
import { PAYMENT_BANNER_TEXT } from '../data/transportData';
import { CreditCard, DollarSign, Building2, FileCheck } from 'lucide-react';
import { VisaLogo, MastercardLogo } from './PaymentLogos';

export const PaymentBanner: React.FC = () => {
  return (
    <section className="py-12 bg-neutral-900 border-y border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-950 rounded-3xl border border-neutral-800 p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Title Column */}
            <div className="md:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                <span>Facilidades de Pago</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {PAYMENT_BANNER_TEXT}
              </h3>

              {/* Visa & Mastercard Logos Highlight */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center gap-2 bg-neutral-900 p-2 rounded-xl border border-neutral-800 shadow-sm">
                  <VisaLogo className="h-7 w-auto" />
                  <MastercardLogo className="h-7 w-auto" />
                </div>
                <span className="text-xs font-bold text-amber-400">
                  Aceptamos Tarjetas de Crédito y Débito
                </span>
              </div>
            </div>

            {/* Methods Grid */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-neutral-900 p-3.5 rounded-2xl border border-neutral-800 text-center flex flex-col items-center justify-center space-y-1.5">
                <div className="flex items-center justify-center gap-1.5">
                  <VisaLogo className="h-5 w-auto" />
                  <MastercardLogo className="h-5 w-auto" />
                </div>
                <span className="text-xs font-bold text-white">Tarjetas de Crédito</span>
                <span className="text-[10px] text-amber-400 font-semibold">Visa / Mastercard</span>
              </div>

              <div className="bg-neutral-900 p-3.5 rounded-2xl border border-neutral-800 text-center flex flex-col items-center justify-center">
                <Building2 className="w-6 h-6 text-amber-400 mb-1.5" />
                <span className="text-xs font-bold text-white">Transferencias</span>
                <span className="text-[10px] text-neutral-400">Bancos Nacionales</span>
              </div>

              <div className="bg-neutral-900 p-3.5 rounded-2xl border border-neutral-800 text-center flex flex-col items-center justify-center">
                <DollarSign className="w-6 h-6 text-amber-400 mb-1.5" />
                <span className="text-xs font-bold text-white">Efectivo / Cheque</span>
                <span className="text-[10px] text-neutral-400">Pagos en Oficina</span>
              </div>

              <div className="bg-neutral-900 p-3.5 rounded-2xl border border-neutral-800 text-center flex flex-col items-center justify-center">
                <FileCheck className="w-6 h-6 text-amber-400 mb-1.5" />
                <span className="text-xs font-bold text-white">Factura Electrónica</span>
                <span className="text-[10px] text-neutral-400">FEL 100% Contable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


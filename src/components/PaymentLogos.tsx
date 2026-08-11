import React from 'react';

export const VisaLogo: React.FC<{ className?: string }> = ({ className = "h-6 w-auto" }) => (
  <svg className={className} viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Visa Logo">
    <rect width="36" height="24" rx="4" fill="#1A1F71"/>
    <path d="M13.882 16.32H11.728L13.076 8.016H15.23L13.882 16.32ZM22.502 8.212C22.072 8.052 21.398 7.876 20.548 7.876C18.17 7.876 16.49 9.108 16.474 10.86C16.448 12.164 17.674 12.89 18.586 13.324C19.52 13.77 19.832 14.052 19.824 14.448C19.81 15.05 19.066 15.318 18.384 15.318C17.29 15.318 16.634 15.012 16.116 14.786L15.658 16.858C16.29 17.14 17.442 17.382 18.634 17.394C21.18 17.394 22.822 16.166 22.846 14.288C22.868 12.898 21.996 12.022 20.354 11.262C19.388 10.784 18.8 10.456 18.808 9.946C18.808 9.492 19.324 9.014 20.378 9.014C21.2 8.998 21.824 9.182 22.28 9.38L22.502 8.212ZM28.258 8.016H26.586C26.064 8.016 25.666 8.164 25.44 8.682L21.722 16.32H24.01L24.468 15.06H27.272L27.536 16.32H29.566L28.258 8.016ZM25.108 13.312L26.262 10.158L26.924 13.312H25.108ZM10.51 8.016L8.432 13.678L8.212 12.568C7.834 11.272 6.64 9.878 5.32 9.182L7.228 16.32H9.528L13.016 8.016H10.51Z" fill="white"/>
    <path d="M6.862 8.016H3.396L3.336 8.188C6.012 8.852 8.126 10.458 9.176 12.562L8.214 8.016" fill="#F7B600"/>
  </svg>
);

export const MastercardLogo: React.FC<{ className?: string }> = ({ className = "h-6 w-auto" }) => (
  <svg className={className} viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mastercard Logo">
    <rect width="36" height="24" rx="4" fill="#141414"/>
    <circle cx="13.5" cy="12" r="7" fill="#EB001B"/>
    <circle cx="22.5" cy="12" r="7" fill="#F79E1B"/>
    <path d="M18 6.55664C16.3101 7.88086 15.2227 9.80811 15.2227 12C15.2227 14.1919 16.3101 16.1191 18 17.4434C19.6899 16.1191 20.7773 14.1919 20.7773 12C20.7773 9.80811 19.6899 7.88086 18 6.55664Z" fill="#FF5F00"/>
  </svg>
);

export const PaymentLogosBadge: React.FC = () => (
  <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl shadow-sm">
    <VisaLogo className="h-6 w-auto" />
    <MastercardLogo className="h-6 w-auto" />
    <span className="text-[11px] font-bold text-white tracking-wide">Visa & Mastercard</span>
  </div>
);

import React from 'react';
import { TIKTOK_URL, FACEBOOK_URL } from '../data/transportData';

export const TikTokIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    {/* Cyan chromatic channel */}
    <path
      d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-2.31v10.49a2.53 2.53 0 0 1-2.52 2.53 2.53 2.53 0 0 1-2.53-2.53 2.53 2.53 0 0 1 2.53-2.53c.27 0 .53.04.77.12V8.71a5.04 5.04 0 0 0-.77-.06 5.07 5.07 0 0 0-5.07 5.07 5.07 5.07 0 0 0 5.07 5.07 5.07 5.07 0 0 0 5.07-5.07V8.04a6.76 6.76 0 0 0 3.79 1.14V6.87a4.27 4.27 0 0 1-2.9-1.05z"
      fill="#25F4EE"
      transform="translate(-0.7, 0.5)"
    />
    {/* Red/Magenta chromatic channel */}
    <path
      d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-2.31v10.49a2.53 2.53 0 0 1-2.52 2.53 2.53 2.53 0 0 1-2.53-2.53 2.53 2.53 0 0 1 2.53-2.53c.27 0 .53.04.77.12V8.71a5.04 5.04 0 0 0-.77-.06 5.07 5.07 0 0 0-5.07 5.07 5.07 5.07 0 0 0 5.07 5.07 5.07 5.07 0 0 0 5.07-5.07V8.04a6.76 6.76 0 0 0 3.79 1.14V6.87a4.27 4.27 0 0 1-2.9-1.05z"
      fill="#FE2C55"
      transform="translate(0.7, -0.5)"
    />
    {/* Main white silhouette */}
    <path
      d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-2.31v10.49a2.53 2.53 0 0 1-2.52 2.53 2.53 2.53 0 0 1-2.53-2.53 2.53 2.53 0 0 1 2.53-2.53c.27 0 .53.04.77.12V8.71a5.04 5.04 0 0 0-.77-.06 5.07 5.07 0 0 0-5.07 5.07 5.07 5.07 0 0 0 5.07 5.07 5.07 5.07 0 0 0 5.07-5.07V8.04a6.76 6.76 0 0 0 3.79 1.14V6.87a4.27 4.27 0 0 1-2.9-1.05z"
      fill="#FFFFFF"
    />
  </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <rect width="24" height="24" rx="12" fill="#1877F2" />
    <path
      d="M15.4 12.2h-2.3v7.3h-3.1v-7.3H8.3V9.6h1.7V7.9c0-2.3 1.4-3.6 3.5-3.6 1 0 1.9.1 2.1.1v2.5h-1.5c-1.1 0-1.3.5-1.3 1.3v1.4h2.8l-.2 2.6z"
      fill="#FFFFFF"
    />
  </svg>
);

interface SocialLinksProps {
  variant?: 'header' | 'footer' | 'contact-card' | 'pills';
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ variant = 'footer', className = '' }) => {
  if (variant === 'header') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        <a
          href={TIKTOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-full bg-black hover:bg-neutral-900 border border-neutral-700 hover:border-[#FE2C55] transition-all shadow-sm group hover:scale-105"
          title="Síguenos en TikTok (@berakahtransporte)"
          aria-label="TikTok Berakah Transporte"
        >
          <TikTokIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </a>
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-full bg-[#1877F2] hover:bg-[#166fe5] border border-blue-400 hover:border-white transition-all shadow-sm group hover:scale-105"
          title="Síguenos en Facebook (Buses Berakah)"
          aria-label="Facebook Buses Berakah"
        >
          <FacebookIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </a>
      </div>
    );
  }

  if (variant === 'contact-card') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${className}`}>
        <a
          href={TIKTOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-black hover:bg-neutral-900 p-3.5 rounded-2xl border border-neutral-700 hover:border-[#FE2C55] text-white transition-all group shadow-md"
        >
          <div className="p-2.5 bg-neutral-900 border border-neutral-700 rounded-xl group-hover:border-[#25F4EE] transition-colors shrink-0 shadow-inner">
            <TikTokIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-black text-[#25F4EE] uppercase tracking-wider block">TikTok Oficial</span>
            <span className="text-xs font-bold text-white group-hover:text-[#FE2C55] truncate block transition-colors">@berakahtransporte</span>
          </div>
        </a>

        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 p-3.5 rounded-2xl border border-[#1877F2]/40 hover:border-[#1877F2] text-white transition-all group shadow-md"
        >
          <div className="p-2 bg-[#1877F2] rounded-xl group-hover:scale-105 transition-transform shrink-0 shadow-md">
            <FacebookIcon className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-wider block">Facebook Oficial</span>
            <span className="text-xs font-bold text-white group-hover:text-blue-300 truncate block transition-colors">Buses Berakah</span>
          </div>
        </a>
      </div>
    );
  }

  // Default 'footer' or 'pills'
  return (
    <div className={`flex items-center gap-2.5 flex-wrap ${className}`}>
      <a
        href={TIKTOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-black hover:bg-neutral-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all border border-neutral-700 hover:border-[#FE2C55] shadow-lg group hover:scale-[1.02]"
      >
        <TikTokIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span>TikTok: <strong className="font-extrabold text-[#25F4EE]">@berakahtransporte</strong></span>
      </a>

      <a
        href={FACEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#1877F2] hover:bg-[#166fe5] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-lg group hover:scale-[1.02] border border-blue-400"
      >
        <FacebookIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span>Facebook: <strong className="font-extrabold text-white">Buses Berakah</strong></span>
      </a>
    </div>
  );
};


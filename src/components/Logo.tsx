import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'header';
}

export const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  // Height mappings for responsive logo rendering
  const heightClass =
    size === 'sm'
      ? 'h-10 sm:h-12'
      : size === 'lg'
      ? 'h-20 sm:h-28 md:h-32'
      : 'h-12 sm:h-16 md:h-18';

  return (
    <div className="flex items-center select-none group">
      <img
        src="/logo-mrs.png"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://i.ibb.co/r21S20yh/Logo-MRS-BUSES.png";
        }}
        alt="MRS BUSES BY BERAKAH - Logo Oficial"
        referrerPolicy="no-referrer"
        className={`${heightClass} w-auto object-contain transition-transform duration-200 group-hover:scale-105 filter drop-shadow-md py-1`}
      />
    </div>
  );
};


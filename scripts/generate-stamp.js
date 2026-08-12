import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
  <defs>
    <!-- Curved paths for text -->
    <path id="topArc" d="M 32,110 A 78,78 0 1,1 188,110" />
    <path id="bottomArc" d="M 188,110 A 78,78 0 1,1 32,110" />
    <!-- Filter for realistic rubber stamp ink texture -->
    <filter id="stampInk" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>

  <g transform="rotate(-6 110 110)" filter="url(#stampInk)" opacity="0.9">
    <!-- Double Outer Circles -->
    <circle cx="110" cy="110" r="102" fill="none" stroke="#1d4ed8" stroke-width="4.5" />
    <circle cx="110" cy="110" r="94" fill="none" stroke="#1d4ed8" stroke-width="1.8" />
    <circle cx="110" cy="110" r="64" fill="none" stroke="#1d4ed8" stroke-width="1.5" />

    <!-- Top Text Along Arc -->
    <text fill="#1d4ed8" font-size="11" font-family="Arial, Helvetica, sans-serif" font-weight="900" letter-spacing="1.2">
      <textPath href="#topArc" startOffset="50%" text-anchor="middle">
        TRANSPORTE Y BUSES BERAKAH
      </textPath>
    </text>

    <!-- Bottom Text Along Arc -->
    <text fill="#1d4ed8" font-size="10" font-family="Arial, Helvetica, sans-serif" font-weight="800" letter-spacing="1.8">
      <textPath href="#bottomArc" startOffset="50%" text-anchor="middle">
        ★ GUATEMALA, C.A. ★
      </textPath>
    </text>

    <!-- Center Horizontal Banner Lines -->
    <line x1="32" y1="88" x2="188" y2="88" stroke="#1d4ed8" stroke-width="2.2" />
    <line x1="32" y1="132" x2="188" y2="132" stroke="#1d4ed8" stroke-width="2.2" />

    <!-- Inner Banner Subtitle Top -->
    <text x="110" y="82" text-anchor="middle" fill="#1d4ed8" font-size="8.5" font-family="Arial, Helvetica, sans-serif" font-weight="800" letter-spacing="1.5">
      DOCUMENTO AUTORIZADO
    </text>

    <!-- Main Title Center -->
    <text x="110" y="114" text-anchor="middle" fill="#1d4ed8" font-size="18" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" letter-spacing="1">
      MRS BUSES
    </text>

    <!-- Inner Banner Subtitle Bottom -->
    <text x="110" y="126" text-anchor="middle" fill="#1d4ed8" font-size="8" font-family="Arial, Helvetica, sans-serif" font-weight="800" letter-spacing="1.2">
      SELLO OFICIAL DE REGISTRO
    </text>
  </g>
</svg>`;

const publicDir = path.join(__dirname, '..', 'public');
fs.writeFileSync(path.join(publicDir, 'sello-mrs.svg'), svgContent);
fs.writeFileSync(path.join(publicDir, 'sello-mrs.png'), svgContent);
console.log('Official stamp generated successfully in public/sello-mrs.svg & public/sello-mrs.png');

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  imageUrl: string;
  features: string[];
}

export interface FleetServiceInclude {
  unitCapacity: string;
  driver: string;
  amenities?: string;
  maintenance: string;
  fuelOption1: string;
  fuelOption2: string;
  insurance: string;
  importantNote: string;
}

export interface FleetItem {
  id: string;
  name: string;
  category: string;
  capacity: string;
  description: string;
  subpageSubtitle?: string;
  subpageIntro?: string;
  serviceIncludesTitle?: string;
  serviceIncludesDescription?: string;
  serviceIncludes?: FleetServiceInclude;
  imageUrl: string;
  galleryUrls?: string[];
  amenities: string[];
  recommendedFor: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  detailText: string;
}

export interface StatItem {
  id: string;
  label: string;
  targetNumber: number;
  prefix?: string;
  suffix?: string;
  displayValue?: string;
  iconName: string;
}

export type TripType =
  | 'Express'
  | 'Turístico'
  | 'Excursiones escolares'
  | 'Ruta Escolar Mensual o por día'
  | 'Ruta de Personal Mensual o por día';

export type BusType =
  | 'Buses escolares Amarillos 44 a 48 pasajeros'
  | 'Buses tipo Coaster / County 24 a 28'
  | 'Microbuses de 3 a 15 pasajeros';

export interface QuoteFormData {
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string;
  tipoViaje: TripType | '';
  tipoBus: BusType | '';
  mensaje: string;
}

export interface BlogPostTable {
  headers: string[];
  rows: string[][];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  readTime: string;
  date: string;
  author: string;
  imageUrl: string;
  excerpt: string;
  content: {
    intro: string;
    subtitle?: string;
    sections: {
      h2: string;
      paragraphs?: string[];
      bulletPoints?: { bold: string; text: string }[];
      table?: BlogPostTable;
    }[];
    conclusionHeading?: string;
    conclusionParagraphs?: string[];
    ctaText?: string;
    pollOptions?: {
      id: string;
      title: string;
      badge: string;
      description?: string;
    }[];
  };
}

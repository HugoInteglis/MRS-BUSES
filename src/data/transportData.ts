import { ServiceItem, FleetItem, FeatureItem, StatItem } from '../types';

export const WHATSAPP_NUMBER = '+502 4961-6621';
export const WHATSAPP_RAW = '50249616621';
export const COMPANY_NAME = 'MRS BUSES';

export const HERO_DATA = {
  antetitulo: 'Tu aliado en transporte corporativo y de viajes en Guatemala',
  titulo: 'Transporte seguro y renta de buses para cualquier ocasión en Guatemala',
  subtitulo: 'Tu viaje empieza aquí',
  parrafo:
    'Transporte fiable a tu alcance – Solicita tu cotización gratis y sin compromiso. Nos adaptamos a tus necesidades, desde grupos pequeños de 5 pasajeros en adelante.',
};

export const SERVICES_HEADER = {
  linea1: 'TRANSPORTE EN ALQUILER CON LOS MÁS ALTOS ESTÁNDARES DE CALIDAD',
  linea2: 'SOLUCIONES SEGURAS Y CÓMODAS EN RENTA DE BUSES Y TRANSPORTES',
  descripcion:
    'Ofrecemos soluciones de transporte para empresas y particulares, ya sea en viajes corporativos, turismo, eventos especiales o traslados privados, siempre con atención personalizada.',
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'transporte-personal',
    title: 'ALQUILER DE TRANSPORTE DE PERSONAL',
    description:
      'Brindamos servicio de alquiler de transporte de personal para empresas, garantizando traslados seguros, cómodos y puntuales. Contamos con unidades adecuadas y un equipo profesional para asegurar que tu personal llegue a tiempo y con la mejor atención.',
    iconName: 'Building2',
    imageUrl:
      'https://i.ibb.co/G3tC5cms/PHOTO-2024-08-05-17-49-07-2.jpg',
    features: [
      'Rutas corporativas optimizadas',
      'Monitoreo GPS en tiempo real',
      'Pilotos uniformados y profesionales',
      'Planes mensuales y por evento',
    ],
  },
  {
    id: 'eventos-celebraciones',
    title: 'ALQUILER PARA EVENTOS Y CELEBRACIONES',
    description:
      'Ofrecemos servicio de alquiler de transporte para eventos y celebraciones, con unidades cómodas, seguras y puntuales. Nuestro equipo garantiza que tus invitados viajen con confianza y disfruten cada momento, llegando siempre a su destino con total tranquilidad.',
    iconName: 'PartyPopper',
    imageUrl:
      'https://i.ibb.co/RpX4Tc6f/PHOTO-2025-11-10-17-38-27.jpg',
    features: [
      'Atención especial para bodas y graduaciones',
      'Horarios flexibles noche y día',
      'Capacidad adaptada a cada grupo',
      'Unidades impecables y sanitizadas',
    ],
  },
  {
    id: 'bus-escolar',
    title: 'ALQUILER PARA SERVICIO DE BUS ESCOLAR',
    description:
      'Proporcionamos servicio de alquiler de bus escolar para colegios e instituciones, garantizando traslados seguros, cómodos y puntuales. Contamos con unidades equipadas y conductores responsables para asegurar que los estudiantes viajen con confianza y lleguen siempre a tiempo.',
    iconName: 'GraduationCap',
    imageUrl:
      'https://i.ibb.co/zTz9TPYp/PHOTO-2025-01-07-17-33-33.jpg',
    features: [
      'Unidades amarillas reglamentarias y certificadas',
      'Cinturones de seguridad en todos los asientos',
      'Conductores evaluados y con amplio récord de seguridad',
      'Excursiones escolares y rutas diarias',
    ],
  },
  {
    id: 'transporte-turistico',
    title: 'ALQUILER DE TRANSPORTE TURISTICO Y GUIADO',
    description:
      'Ofrecemos servicio de alquiler de transporte turístico y guiado, ideal para conocer Guatemala con comodidad y seguridad. Contamos con unidades modernas y guías capacitados que garantizan recorridos agradables, puntuales y llenos de experiencias inolvidables para cada viajero.',
    iconName: 'Compass',
    imageUrl:
      'https://i.ibb.co/1Y49XkH9/PHOTO-2024-08-05-17-49-07.jpg',
    features: [
      'Cobertura en Antigua, Atitlán, Tikal y todo el país',
      'Aire acondicionado dual y asientos reclinables',
      'Asistencia y coordinación de guías bilingües',
      'Espacio amplio para equipaje',
    ],
  },
];

export const ABOUT_DATA = {
  titulo: 'SOBRE NOSOTROS',
  subtitulo:
    'Especialistas en renta de buses y transporte con pilotos responsables, con más de 15 años de experiencia',
  parrafOS: [
    'Con más de 15 años de trayectoria, Mrs Buses se ha posicionado como una de las empresas de transporte más confiables en Guatemala. Brindamos soluciones a la medida para empresas y particulares, enfocados en innovar y garantizar a cada cliente un servicio cómodo, seguro y de calidad.',
    'Mrs Buses inició operaciones hace más de 15 años con un propósito firme: brindar un servicio de transporte seguro, cómodo y confiable. Gracias a nuestro compromiso con la puntualidad y la atención personalizada, hemos logrado construir relaciones sólidas con empresas y clientes particulares en toda Guatemala.',
    'Con el paso del tiempo, incorporamos herramientas tecnológicas que nos permiten optimizar el proceso de reserva, facilitar la comunicación y garantizar una experiencia más ágil y eficiente para cada usuario. Esta evolución nos ha impulsado a crecer y a responder con mayor rapidez a las necesidades de nuestros clientes.',
    'Hoy, seguimos trabajando con la misma pasión de nuestros inicios, apostando por la innovación y la excelencia en cada viaje, lo que nos ha consolidado como una de las empresas de transporte privado más confiables y reconocidas del país.',
  ],
};

export const WHY_US_DATA = {
  bannerText:
    '-Somos referentes en transporte de buses en Guatemala, reconocidos por comodidad, puntualidad y servicio-',
  titulo: '¿Por qué elegirnos?',
  descripcion:
    'Porque brindamos soluciones de transporte flexibles, pensadas tanto para empresas como para clientes particulares, adaptándonos siempre a cada necesidad.',
  cajas: [
    {
      id: 'calidad-seguridad',
      title: 'Calidad y Seguridad',
      description:
        'Viajes cómodos y garantizados. Nuestra flota cuenta con el mejor equipamiento y mantenimiento bajo los más altos estándares de seguridad.',
      iconName: 'ShieldCheck',
      detailText:
        'Cada unidad pasa por rigurosas inspecciones mecánicas antes de salir. Equipadas con frenos ABS, cinturones de seguridad, GPS y póliza de seguro de cobertura amplia para todos los pasajeros.',
    },
    {
      id: 'experiencia-confiabilidad',
      title: 'Experiencia y Confiabilidad',
      description:
        'Años de trayectoria nos respaldan. Confíe su viaje a la experiencia de un equipo y una flota de probada fiabilidad en la región.',
      iconName: 'Award',
      detailText:
        'Más de 15 años atendiendo empresas multinacionales, embajadas, centros educativos y familias guatemaltecas nos respaldan como líderes del sector.',
    },
    {
      id: 'experiencia-variacion',
      title: 'Experiencia y Confiabilidad',
      description:
        'Más que un viaje: confianza total. Nuestra experiencia se traduce en soluciones de transporte confiables y sin contratiempos para usted.',
      iconName: 'CheckCircle2',
      detailText:
        'Flexibilidad en logística, atención personalizada 24/7 y asistencia en carretera inmediata para garantizar que nada detenga tu itinerario.',
    },
  ],
};

export const STATS_DATA: StatItem[] = [
  {
    id: 'pasajeros',
    label: 'PASAJEROS TRASPORTADOS',
    targetNumber: 18000,
    suffix: '+',
    iconName: 'Users',
  },
  {
    id: 'empresas',
    label: 'EMPRESAS',
    targetNumber: 70,
    suffix: '+',
    iconName: 'Building',
  },
  {
    id: 'kms',
    label: 'KILOMETROS RECORRIDOS',
    targetNumber: 198000,
    suffix: '+',
    iconName: 'Route',
  },
  {
    id: 'flota',
    label: 'VEHICULOS EN FLOTA',
    targetNumber: 25,
    suffix: '+',
    iconName: 'Bus',
  },
];

export const PAYMENT_BANNER_TEXT =
  'ACEPTAMOS TARJETAS DE DÉBITO Y DE CRÉDITO Y CUOTAS CREDOMATIC DE 3 A 18 CUOTAS';

export const QUOTE_SECTION_DATA = {
  titulo: 'SOLICITA TU COTIZACIÓN',
  subtitulo: 'Viaja sin Límites: Tu Destino, Nuestro Compromiso',
  descripcion:
    'En MRS BUS, le ofrecemos una experiencia de viaje superior: seguridad, puntualidad y máximo confort. Rellene el formulario y reserve su trayecto con nuestra flota moderna y conductores expertos. Su destino le espera.',
};

export const FLEET_LIST: FleetItem[] = [
  {
    id: 'buses-escolares',
    name: 'Buses Escolares',
    category: 'Buses Escolares',
    capacity: '44 a 48 pasajeros',
    description:
      'Unidades icónicas de alta durabilidad y capacidad, perfectamente acondicionadas para transportes escolares, rutas diarias, retiros y excursiones masivas.',
    subpageSubtitle: 'ALQUILER MENSUAL O POR DÍAS ESPECÍFICOS',
    subpageIntro:
      'En MRS Bus, entendemos la importancia de un transporte seguro y confiable para la comunidad educativa en Guatemala. Nuestra moderna flota de buses escolares está diseñada para ofrecer máxima comodidad y seguridad, con capacidades que varían entre 44 y 48 pasajeros, ideales para cubrir las necesidades de cualquier institución, excursión o evento grupal. Ofrecemos opciones de alquiler flexible, ya sea que requiera un servicio constante a lo largo del mes escolar o necesite el bus solo para días y eventos específicos. Con MRS Bus, usted asegura un traslado eficiente y profesional, manteniendo la tranquilidad de que sus pasajeros están en las mejores manos.',
    serviceIncludesTitle: 'Lo Que Incluye Nuestro Servicio de Alquiler',
    serviceIncludesDescription:
      'El servicio de alquiler de nuestra flota de Buses Escolares de MRS Bus en Guatemala está diseñado para ofrecer una solución de transporte segura, puntual y profesional, ideal para colegios, instituciones o grupos, ya sea para un periodo mensual o para días específicos.',
    serviceIncludes: {
      unitCapacity:
        'Unidad Escolar de 44 a 48 Pasajeros: Acceso a nuestra flota con capacidad garantizada de 44 a 48 pasajeros, con acabados superiores y diseñada para la comodidad del estudiante y grupo.',
      driver:
        'Conductor Profesional Certificado: Un conductor con experiencia en manejo, responsable y debidamente autorizado, con profundo conocimiento de las rutas y un enfoque en el servicio discreto y de alto nivel.',
      amenities:
        'Comodidades Premium a Bordo: El servicio incluye aire acondicionado funcional, asientos confortables, y presentación impecable de la unidad, esenciales para el traslado.',
      maintenance:
        'Mantenimiento y Seguridad: Todos nuestros vehículos se entregan en óptimas condiciones mecánicas y de limpieza. El servicio incluye la cobertura de mantenimiento preventivo y correctivo de la unidad.',
      fuelOption1:
        'Opción 1 (Recomendada): No incluye combustible. La tarifa de alquiler cubre el vehículo y el conductor, y el cliente gestiona la provisión del combustible para sus rutas.',
      fuelOption2:
        'Opción 2 (Si lo incluyes): Combustible incluido dentro de las rutas y kilometraje acordados contractualmente.',
      insurance:
        'Seguros de Responsabilidad Civil: Las unidades cuentan con los seguros requeridos para la operación de transporte de pasajeros, brindando el máximo respaldo legal para su empresa e institución.',
      importantNote:
        'Los costos de peajes, entradas a parques, o cualquier gasto ajeno a la operación de la ruta estándar no están incluidos en la tarifa base y se gestionan por separado, a menos que se especifique lo contrario en el contrato.',
    },
    imageUrl:
      'https://i.ibb.co/zTz9TPYp/PHOTO-2025-01-07-17-33-33.jpg',
    galleryUrls: [
      'https://i.ibb.co/zTz9TPYp/PHOTO-2025-01-07-17-33-33.jpg',
      'https://i.ibb.co/67rf9r8D/PHOTO-2024-08-06-18-47-41.jpg',
      'https://i.ibb.co/N24FV7dh/PHOTO-2024-08-06-18-47-42-2.jpg',
      'https://i.ibb.co/3YhKgV6w/PHOTO-2024-08-06-18-47-42.jpg',
    ],
    amenities: [
      'Capacidad 44-48 pax',
      'Asientos de alto impacto',
      'Cinturones de seguridad',
      'Extintores y botiquín',
      'Sistema de comunicación GPS',
    ],
    recommendedFor: 'Rutas escolares, colectivos, retiros y excursiones',
  },
  {
    id: 'county-coaster',
    name: 'County o Coaster',
    category: 'County o Coaster',
    capacity: '24 a 28 pasajeros',
    description:
      'Vehículos tipo County o Coaster de 24 a 28 pasajeros, combinando la agilidad de un microbús con el confort y seguridad de un autobús para grupos medianos.',
    subpageSubtitle: 'ALQUILER MENSUAL O POR DÍAS ESPECÍFICOS',
    subpageIntro:
      'En MRS Bus, ofrecemos soluciones de transporte versátiles y de alta calidad en Guatemala, y nuestros vehículos tipo County o Coaster son la opción ideal para grupos medianos. Con una cómoda capacidad de 24 a 28 pasajeros, estas unidades combinan la agilidad de un microbús con el confort y la seguridad de un autobús. Son perfectas para traslados ejecutivos, giras empresariales, grupos turísticos reducidos o rutas escolares con menor número de estudiantes. Al igual que nuestra flota más grande, puede elegir el alquiler flexible, ya sea para un servicio constante a lo largo del mes o para viajes puntuales y eventos específicos. Con MRS Bus, garantizamos un traslado eficiente, confortable y adaptado a sus necesidades específicas.',
    serviceIncludesTitle: 'Lo Que Incluye Nuestro Servicio de Alquiler de County o Coaster',
    serviceIncludesDescription:
      'El servicio de alquiler de vehículos tipo County o Coaster de MRS Bus en Guatemala está diseñado para ofrecer una solución de transporte ejecutiva, versátil y segura, ideal para grupos medianos, ya sea para un periodo mensual o para días específicos.',
    serviceIncludes: {
      unitCapacity:
        'Vehículo County/Coaster de Capacidad Media: Acceso a nuestra moderna flota de 24 a 28 pasajeros, ideal para el traslado cómodo y ágil de grupos medianos, viajes corporativos o rutas con acceso limitado.',
      driver:
        'Conductor Profesional y Calificado: Un conductor experimentado, responsable y debidamente autorizado, con profundo conocimiento de las rutas en Guatemala, asegurando puntualidad y un trato amable.',
      maintenance:
        'Mantenimiento y Seguridad: Todos nuestros vehículos se entregan en óptimas condiciones mecánicas y de limpieza. El servicio incluye la cobertura de mantenimiento preventivo y correctivo de la unidad.',
      fuelOption1:
        'Opción 1 (Recomendada): No incluye combustible. La tarifa de alquiler cubre el vehículo y el conductor, y el cliente gestiona la provisión del combustible para sus rutas.',
      fuelOption2:
        'Opción 2 (Si lo incluyes): Combustible incluido dentro de las rutas y kilometraje acordados contractualmente.',
      insurance:
        'Seguros de Responsabilidad Civil: Las unidades cuentan con los seguros requeridos para la operación de transporte de pasajeros, brindando el respaldo legal necesario.',
      importantNote:
        'Los costos de peajes, entradas a parques o cualquier gasto ajeno a la operación de la ruta estándar no están incluidos en la tarifa base y se gestionan por separado, a menos que se especifique lo contrario en el contrato.',
    },
    imageUrl:
      'https://i.ibb.co/G3tC5cms/PHOTO-2024-08-05-17-49-07-2.jpg',
    galleryUrls: [
      'https://i.ibb.co/G3tC5cms/PHOTO-2024-08-05-17-49-07-2.jpg',
      'https://i.ibb.co/1Y49XkH9/PHOTO-2024-08-05-17-49-07.jpg',
    ],
    amenities: [
      'Capacidad 24 a 28 pasajeros',
      'Aire Acondicionado Central',
      'Asientos Reclinables Confortables',
      'Cinturones de Seguridad',
      'Mantenimiento y Seguro Incluido',
    ],
    recommendedFor: 'Giras empresariales, transporte ejecutivo, turismo y rutas medianas',
  },
  {
    id: 'microbus-estandar',
    name: 'Micro bus Estándar',
    category: 'Micro bus Estándar',
    capacity: '7 a 15 pasajeros',
    description:
      'Solución de transporte ágil, económica y personalizada en Guatemala para grupos pequeños, ideal para traslados ejecutivos, familiares y rutas de personal.',
    subpageSubtitle: 'ALQUILER MENSUAL O POR DÍAS ESPECÍFICOS',
    subpageIntro:
      'En MRS Bus, ofrecemos una solución de transporte ágil, económica y personalizada en Guatemala, perfecta para grupos pequeños: nuestro servicio de Microbús Estándar. Con una capacidad ideal de 7 a 15 pasajeros, estas unidades son perfectas para traslados ejecutivos exclusivos, familias numerosas, grupos turísticos muy reducidos, o rutas de personal que requieren servicio puerta a puerta en áreas de difícil acceso. Ofrecemos la máxima flexibilidad de alquiler, ya sea bajo un contrato mensual para servicios de ruta fijos o por días específicos para eventos puntuales. Con MRS Bus, usted asegura un transporte rápido, eficiente y con la comodidad necesaria para su grupo reducido.',
    serviceIncludesTitle: 'Lo Que Incluye Nuestro Servicio de Alquiler de Microbús Estándar',
    serviceIncludesDescription:
      'El servicio de alquiler de Microbús Estándar de MRS Bus en Guatemala está diseñado para ofrecer una solución de transporte personalizada y económica, ideal para grupos pequeños, ya sea para un periodo mensual o para días específicos.',
    serviceIncludes: {
      unitCapacity:
        'Microbús Estándar de Capacidad Reducida: Acceso a nuestra flota con capacidad garantizada de 7 a 15 pasajeros, ideal para el traslado ágil y económico de grupos pequeños.',
      driver:
        'Conductor Profesional y Calificado: Un conductor experimentado, responsable y debidamente autorizado, con profundo conocimiento de las rutas en Guatemala, asegurando puntualidad y un trato amable.',
      maintenance:
        'Mantenimiento y Seguridad: Todos nuestros vehículos se entregan en óptimas condiciones mecánicas y de limpieza. El servicio incluye la cobertura de mantenimiento preventivo y correctivo de la unidad.',
      fuelOption1:
        'Opción 1 (Recomendada): No incluye combustible. La tarifa de alquiler cubre el vehículo y el conductor, y el cliente gestiona la provisión del combustible para sus rutas.',
      fuelOption2:
        'Opción 2 (Si lo incluyes): Combustible incluido dentro de las rutas y kilometraje acordados contractualmente.',
      insurance:
        'Seguros de Responsabilidad Civil: Las unidades cuentan con los seguros requeridos para la operación de transporte de pasajeros, brindando el respaldo legal necesario.',
      importantNote:
        'Los costos de peajes, entradas a parques o cualquier gasto ajeno a la operación de la ruta estándar no están incluidos en la tarifa base y se gestionan por separado, a menos que se especifique lo contrario en el contrato.',
    },
    imageUrl:
      'https://i.ibb.co/b548yX82/PHOTO-2025-09-25-18-24-02-2.jpg',
    galleryUrls: [
      'https://i.ibb.co/b548yX82/PHOTO-2025-09-25-18-24-02-2.jpg',
      'https://i.ibb.co/tPbn0cLk/PHOTO-2025-09-25-18-24-02.jpg',
      'https://i.ibb.co/5W0n00jQ/PHOTO-2025-11-10-17-38-28.jpg',
      'https://i.ibb.co/bjQY5CFQ/PHOTO-2025-01-08-14-42-39-2.jpg',
      'https://i.ibb.co/RTLT1GDC/PHOTO-2025-01-08-14-42-39.jpg',
    ],
    amenities: [
      'Capacidad 7-15 pax',
      'Aire Acondicionado potente',
      'Conexiones USB para carga',
      'Asientos confortables',
      'Acceso fácil y rápido',
    ],
    recommendedFor: 'Transfer aeropuerto, ejecutivos, familias y grupos pequeños',
  },
  {
    id: 'mini-pullman',
    name: 'Mini Pullman',
    category: 'Mini Pullman',
    capacity: '33 pasajeros',
    description:
      'Opción premium para el transporte de grupos que buscan el máximo confort en sus viajes, con asientos reclinables, aire acondicionado y espacio para equipaje.',
    subpageSubtitle: 'ALQUILER MENSUAL O POR DÍAS ESPECÍFICOS',
    subpageIntro:
      'En MRS Bus, el servicio de Mini Pullman en Guatemala representa la opción premium para el transporte de grupos que buscan el máximo confort en sus viajes. Con una capacidad ideal para 33 pasajeros, estas unidades están diseñadas con asientos reclinables, aire acondicionado y espacio adecuado para equipaje, haciéndolas perfectas para giras turísticas, viajes de larga distancia, o traslados ejecutivos que requieren comodidad superior. Ofrecemos opciones de alquiler flexible, adaptándonos a sus necesidades, ya sea que requiera un servicio constante a lo largo del mes o necesite la unidad solo para días y eventos específicos. Con nuestro Mini Pullman, garantizamos un viaje placentero, seguro y con el máximo nivel de experiencia.',
    serviceIncludesTitle: 'Lo Que Incluye Nuestro Servicio de Alquiler de Mini Pullman',
    serviceIncludesDescription:
      'El servicio de alquiler de Mini Pullman de MRS Bus en Guatemala está diseñado para ofrecer una solución de transporte premium, confortable y segura, ya sea para un periodo mensual o para días específicos.',
    serviceIncludes: {
      unitCapacity:
        'Mini Pullman de 33 Pasajeros: Acceso a nuestra flota con capacidad garantizada de 33 pasajeros, diseñado con asientos confortables, ideal para el traslado de tours y grupos ejecutivos en largas distancias.',
      driver:
        'Conductor Profesional y Calificado: Un conductor experimentado, responsable y debidamente autorizado, con profundo conocimiento de las rutas en Guatemala, asegurando puntualidad y un trato amable.',
      amenities:
        'Comodidades a Bordo: El servicio incluye el uso de aire acondicionado y espacio adecuado para equipaje, elementos clave para la comodidad en viajes prolongados.',
      maintenance:
        'Mantenimiento y Seguridad: Todos nuestros vehículos se entregan en óptimas condiciones mecánicas y de limpieza. El servicio incluye la cobertura de mantenimiento preventivo y correctivo de la unidad.',
      fuelOption1:
        'Opción 1 (Recomendada): No incluye combustible. La tarifa de alquiler cubre el vehículo y el conductor, y el cliente gestiona la provisión del combustible para sus rutas.',
      fuelOption2:
        'Opción 2 (Si lo incluyes): Combustible incluido dentro de las rutas y kilometraje acordados contractualmente.',
      insurance:
        'Seguros de Responsabilidad Civil: Las unidades cuentan con los seguros requeridos para la operación de transporte de pasajeros, brindando el respaldo legal necesario.',
      importantNote:
        'Los costos de peajes, entradas a parques, hospedajes del conductor o cualquier gasto ajeno a la operación de la ruta estándar no están incluidos en la tarifa base y se gestionan por separado, a menos que se especifique lo contrario en el contrato.',
    },
    imageUrl:
      'https://i.ibb.co/RpX4Tc6f/PHOTO-2025-11-10-17-38-27.jpg',
    galleryUrls: [
      'https://i.ibb.co/RpX4Tc6f/PHOTO-2025-11-10-17-38-27.jpg',
    ],
    amenities: [
      'Capacidad 33 pasajeros',
      'Aire Acondicionado & Climatización',
      'Asientos Reclinables Confortables',
      'Espacio amplio para equipaje',
      'Mantenimiento y Seguro Incluido',
    ],
    recommendedFor: 'Giras turísticas, viajes de larga distancia y traslados ejecutivos',
  },
  {
    id: 'linea-ejecutiva',
    name: 'Línea Ejecutiva',
    category: 'Línea ejecutiva',
    capacity: '24 a 28 pasajeros',
    description:
      'Diseñada para el sector corporativo, delegaciones y grupos que exigen el máximo nivel de profesionalismo, confort y discreción en Guatemala.',
    subpageSubtitle: 'ALQUILER MENSUAL O POR DÍAS ESPECÍFICOS',
    subpageIntro:
      'En MRS Bus, presentamos nuestra flota de Línea Ejecutiva, diseñada para el sector corporativo, delegaciones y grupos que exigen el máximo nivel de profesionalismo, confort y discreción en Guatemala. Con una cómoda capacidad de 24 a 28 pasajeros, estas unidades no solo ofrecen un traslado, sino una extensión de su imagen corporativa. Son perfectas para el transporte de personal gerencial, delegaciones de alto nivel, eventos de marca o cualquier ocasión donde la calidad y la imagen sean prioritarias. Le ofrecemos la flexibilidad de alquiler mensual para sus rutas de personal clave o por días específicos para reuniones y eventos. Con MRS Bus, garantizamos un servicio que cumple con los estándares más exigentes del mundo de los negocios.',
    serviceIncludesTitle: 'Lo Que Incluye Nuestro Servicio de Alquiler de Línea Ejecutiva',
    serviceIncludesDescription:
      'El servicio de alquiler de Línea Ejecutiva de MRS Bus en Guatemala está diseñado para ofrecer una solución de transporte integral, segura y flexible, ya sea para un periodo mensual o para días específicos.',
    serviceIncludes: {
      unitCapacity:
        'Unidad Ejecutiva de Capacidad Media (24 a 28 Pasajeros): Acceso a nuestra moderna flota corporativa, ideal para el traslado de personal gerencial, delegaciones y eventos de marca con imagen profesional.',
      driver:
        'Conductor Profesional y Calificado: Un conductor experimentado, responsable y debidamente autorizado, con profundo conocimiento de las rutas en Guatemala, asegurando puntualidad y un trato amable.',
      maintenance:
        'Mantenimiento y Seguridad: Todos nuestros vehículos se entregan en óptimas condiciones mecánicas. El servicio incluye la cobertura de mantenimiento preventivo y correctivo de la unidad.',
      fuelOption1:
        'Opción 1 (Recomendada): No incluye combustible. La tarifa de alquiler cubre el vehículo y el conductor, y el cliente gestiona la provisión del combustible para sus rutas.',
      fuelOption2:
        'Opción 2 (Si lo incluyes): Combustible incluido dentro de las rutas y kilometraje acordados contractualmente.',
      insurance:
        'Seguros de Responsabilidad Civil: Las unidades cuentan con los seguros requeridos para la operación de transporte de pasajeros, brindando un respaldo legal para la empresa y los usuarios.',
      importantNote:
        'Los costos de peajes, entradas a parques o cualquier gasto ajeno a la operación de la ruta diaria estándar no están incluidos en la tarifa base y se gestionan por separado, a menos que se especifique lo contrario en el contrato.',
    },
    imageUrl:
      'https://i.ibb.co/1Y49XkH9/PHOTO-2024-08-05-17-49-07.jpg',
    galleryUrls: [
      'https://i.ibb.co/1Y49XkH9/PHOTO-2024-08-05-17-49-07.jpg',
      'https://i.ibb.co/G3tC5cms/PHOTO-2024-08-05-17-49-07-2.jpg',
    ],
    amenities: [
      'Capacidad 24 a 28 pasajeros',
      'Acabados ejecutivos & alto confort',
      'Conductor Profesional Calificado',
      'Mantenimiento y Seguro Incluido',
      'Alquiler Mensual o Eventos Específicos',
    ],
    recommendedFor: 'Transporte de personal gerencial, delegaciones de alto nivel, eventos de marca',
  },
];

import { PropertyListing, StatusType, DashboardStats, ChartDataPoint, CrmLead, PipelineStage } from './types';

export const MOCK_STATS: DashboardStats = {
  newListings: 12,
  duplicates: 8,
  priceDrops: 4
};

export const CHART_DATA: ChartDataPoint[] = [
  { day: 'Lun', listings: 45 },
  { day: 'Mar', listings: 52 },
  { day: 'Mié', listings: 48 },
  { day: 'Jue', listings: 61 },
  { day: 'Vie', listings: 55 },
  { day: 'Sáb', listings: 67 },
  { day: 'Dom', listings: 70 },
];

export const MOCK_LISTINGS: PropertyListing[] = [
  {
    id: '1',
    title: 'Piso luminoso con terraza',
    location: 'Burriana, Centre',
    price: 125000,
    imageUrl: 'https://picsum.photos/400/300?random=1',
    detectedAt: '2023-10-24T09:30:00',
    status: StatusType.DUPLICATE,
    sources: [
      { name: 'Idealista', url: '#' },
      { name: 'Fotocasa', url: '#' },
      { name: 'Habitaclia', url: '#' }
    ],
    specs: { rooms: 3, surface: 95 },
    coordinates: { x: 45, y: 40 }
  },
  {
    id: '2',
    title: 'Casa de pueblo para reformar',
    location: 'Castelló de la Plana',
    price: 89000,
    imageUrl: 'https://picsum.photos/400/300?random=2',
    detectedAt: '2023-10-24T08:15:00',
    status: StatusType.NEW,
    sources: [
      { name: 'Idealista', url: '#' }
    ],
    specs: { rooms: 4, surface: 120 },
    coordinates: { x: 30, y: 25 }
  },
  {
    id: '3',
    title: 'Villa moderna vistas al mar',
    location: 'Benicàssim',
    price: 450000,
    previousPrice: 475000,
    imageUrl: 'https://picsum.photos/400/300?random=3',
    detectedAt: '2023-10-23T14:45:00',
    status: StatusType.PRICE_DROP,
    sources: [
      { name: 'Green-Acres', url: '#' },
      { name: 'LuxuryEstate', url: '#' }
    ],
    specs: { rooms: 5, surface: 250 },
    coordinates: { x: 75, y: 60 }
  },
  {
    id: '4',
    title: 'Ático Valencia Centro',
    location: 'València, Ciutat Vella',
    price: 320000,
    imageUrl: 'https://picsum.photos/400/300?random=4',
    detectedAt: '2023-10-23T11:20:00',
    status: StatusType.DUPLICATE,
    sources: [
      { name: 'Idealista', url: '#' },
      { name: 'Fotocasa', url: '#' }
    ],
    specs: { rooms: 2, surface: 85 },
    coordinates: { x: 20, y: 80 }
  },
  {
    id: '5',
    title: 'Dúplex cerca universidad',
    location: 'Castelló, Zona UJI',
    price: 145000,
    imageUrl: 'https://picsum.photos/400/300?random=5',
    detectedAt: '2023-10-22T16:00:00',
    status: StatusType.NEW,
    sources: [
      { name: 'Fotocasa', url: '#' }
    ],
    specs: { rooms: 3, surface: 105 },
    coordinates: { x: 55, y: 35 }
  }
];

export const MOCK_LEADS: CrmLead[] = [
  {
    id: 'l1',
    propertyId: '1',
    ownerName: 'Maria Garcia',
    ownerPhone: '+34 612 345 678',
    stage: PipelineStage.CONTACTED,
    probability: 40,
    nextAction: 'Recontactar si no responde',
    nextActionDate: '2023-10-26',
    notes: 'Parece tener prisa por vender, publicado en 3 portales.',
    tags: ['Urgente', 'Inversor']
  },
  {
    id: 'l3',
    propertyId: '3',
    ownerName: 'Alejandro Ruiz',
    ownerPhone: '+34 699 888 777',
    stage: PipelineStage.MEETING,
    probability: 75,
    nextAction: 'Preparar valoración comparativa',
    nextActionDate: '2023-10-27',
    notes: 'Villa heredada, no vive aquí. Busca gestión integral.',
    tags: ['Lujo', 'Exclusiva']
  },
  {
    id: 'l4',
    propertyId: '4',
    ownerName: 'Sofia Marti',
    ownerPhone: '+34 600 111 222',
    stage: PipelineStage.LEAD,
    probability: 20,
    nextAction: 'Conseguir teléfono',
    nextActionDate: '2023-10-25',
    notes: 'Ático escaso. Preguntar a vecinos.',
    tags: ['Investigación']
  },
  {
    id: 'l2',
    propertyId: '2',
    ownerName: 'Carlos Benet',
    ownerPhone: '+34 655 444 333',
    stage: PipelineStage.SIGNED,
    probability: 100,
    nextAction: 'Enviar fotógrafo',
    nextActionDate: '2023-10-28',
    notes: 'Mandato simple firmado, posible exclusiva si venta rápida.',
    tags: ['Reforma']
  }
];
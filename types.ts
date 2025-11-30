export enum StatusType {
  NEW = 'NEW',
  DUPLICATE = 'DUPLICATE',
  PRICE_DROP = 'PRICE_DROP',
  SOLD = 'SOLD'
}

export enum PipelineStage {
  LEAD = 'LEAD',           // Nouveau lead identifié
  CONTACTED = 'CONTACTED', // Propriétaire contacté
  MEETING = 'MEETING',     // RDV d'estimation fixé
  OFFER = 'OFFER',         // Proposition de mandat envoyée
  SIGNED = 'SIGNED'        // Mandat signé (Gagné)
}

export interface ListingSource {
  name: string;
  url: string;
  icon?: string;
}

export interface PropertyListing {
  id: string;
  title: string;
  location: string;
  price: number;
  previousPrice?: number;
  imageUrl: string;
  detectedAt: string;
  status: StatusType;
  sources: ListingSource[];
  specs: {
    rooms: number;
    surface: number; // m2
  };
  coordinates: {
    x: number; // Pourcentage X sur la carte (0-100)
    y: number; // Pourcentage Y sur la carte (0-100)
  };
}

export interface CrmLead {
  id: string;
  propertyId: string; // Lien vers le listing
  ownerName: string;
  ownerPhone: string;
  stage: PipelineStage;
  probability: number; // % de chance de signer
  nextAction: string;
  nextActionDate: string;
  notes: string;
  tags: string[];
}

export interface DashboardStats {
  newListings: number;
  duplicates: number;
  priceDrops: number;
}

export interface ChartDataPoint {
  day: string;
  listings: number;
}
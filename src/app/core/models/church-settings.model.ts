export interface ChurchContact {
  whatsapp: string;
  email: string;
  instagram: string;
  facebook: string;
  youtube: string;
}

export interface ChurchAddress {
  cep: string;
  block: string;
  set: string;
  lot: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface ChurchServiceSchedule {
  day: string;
  times: string[];
}

export interface ChurchWeeklyEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  imageUrl?: string;
  whatsapp?: string;
}

export interface ChurchSettings {
  name: string;

  contact: ChurchContact;

  address: ChurchAddress;

  services: ChurchServiceSchedule[];

  weeklyEvents: ChurchWeeklyEvent[];
}


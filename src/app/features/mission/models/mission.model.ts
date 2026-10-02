export interface MissionActivity {
  title: string;
  description: string;
  imageUrl?: string;
}

export interface Mission {
  id: number;

  country: string;
  region: string;

  title: string;
  description: string;

  headline: string;
  content: string[];

  imageUrl?: string;

  activities: MissionActivity[];
}

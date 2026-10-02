import { MinistryActivity } from './ministry-activity.model';

export interface Ministry {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  route: string;
  headline: string;
  content: string[];
  activities: MinistryActivity[];
}

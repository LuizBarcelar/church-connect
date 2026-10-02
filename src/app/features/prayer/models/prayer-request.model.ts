export interface PrayerRequest {
  id: number;
  name: string;
  email?: string;
  message: string;
  isPrivate: boolean;
  status: 'pending' | 'answered';
  createdAt: string;
}

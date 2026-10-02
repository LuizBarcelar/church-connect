import { LucideIconData } from 'lucide-angular';

export type AdminNotificationType =
  | 'event'
  | 'prayer'
  | 'member';

export interface AdminNotification {
  id: string;

  type: AdminNotificationType;

  title: string;

  description: string;

  time: string;

  route: string;

  icon: LucideIconData;

  read: boolean;

  sortDate: Date;
}

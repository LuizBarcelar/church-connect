export type MinistryRole =
  | 'obreiro'
  | 'auxiliar'
  | 'pastor'
  | 'louvor'
  | 'minist-infantil'
  | 'minist-jovens'
  | 'minist-homens'
  | 'minist-mulheres'
  | 'minist-intercessao'
  | 'minist-evangelismo';

export interface Member {
  id: number;

  // Dados pessoais
  fullName: string;
  birthDate: string;
  photoUrl?: string;

  // Contato
  phone: string;
  hasWhatsApp: boolean;
  email?: string;

  // Endereço
  state: string;
  city: string;
  cep: string;
  neighborhood: string;
  block: string;
  set: string;
  house: string;

  // Vida cristã
  baptized: boolean;
  baptismDate?: string;
  baptismPlace?: string;
  baptizedInHolySpirit: boolean;

  // Atuação na obra
  hasWorkedInMinistry: boolean;
  ministryRoles: MinistryRole[];

  // Controle
  createdAt: string;
}

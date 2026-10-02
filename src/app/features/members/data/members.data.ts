import { Member } from '../models/member.model';

export const MEMBERS: Member[] = [
  {
    id: 1,
    fullName: 'João da Silva',
    birthDate: '1985-09-20',

    photoUrl: '',

    phone: '61999999999',
    hasWhatsApp: true,
    email: 'joao.silva@email.com',

    state: 'DF',
    city: 'Planaltina',
    cep: '73300-000',
    neighborhood: 'Centro',
    block: '01',
    set: 'A',
    house: '10',

    baptized: true,
    baptismDate: '2005-06-12',
    baptismPlace:
      'Igreja Internacional da Graça de Deus',
    baptizedInHolySpirit: true,

    hasWorkedInMinistry: true,
    ministryRoles: ['obreiro'],

    createdAt: '2026-01-10',
  },

  {
    id: 2,
    fullName: 'Maria Aparecida',
    birthDate: '1992-09-25',

    photoUrl: '',

    phone: '61988888888',
    hasWhatsApp: true,
    email: 'maria.aparecida@email.com',

    state: 'GO',
    city: 'Formosa',
    cep: '73801-000',
    neighborhood: 'Centro',
    block: '02',
    set: 'B',
    house: '15',

    baptized: true,
    baptismDate: '2012-03-18',
    baptismPlace:
      'Igreja Internacional da Graça de Deus',
    baptizedInHolySpirit: true,

    hasWorkedInMinistry: true,
    ministryRoles: [
      'minist-mulheres',
    ],

    createdAt: '2026-02-15',
  },

  {
    id: 3,
    fullName: 'Carlos Oliveira',
    birthDate: '1988-12-10',

    photoUrl: '',

    phone: '61977777777',
    hasWhatsApp: false,
    email: 'carlos.oliveira@email.com',

    state: 'DF',
    city: 'Brasília',
    cep: '70000-000',
    neighborhood: 'Asa Sul',
    block: '03',
    set: 'C',
    house: '20',

    baptized: false,
    baptismDate: undefined,
    baptismPlace: undefined,
    baptizedInHolySpirit: false,

    hasWorkedInMinistry: false,
    ministryRoles: [],

    createdAt: '2026-03-05',
  },
];

export interface StateOption {
  uf: string;
  name: string;
  cities: string[];
}

export const BRAZIL_STATES: StateOption[] = [
  {
    uf: 'DF',
    name: 'Distrito Federal',
    cities: [
      'Brasília',
      'Ceilândia',
      'Taguatinga',
      'Samambaia',
      'Planaltina',
      'Gama',
      'Sobradinho',
      'Guará',
      'Águas Claras',
      'Santa Maria',
      'São Sebastião',
      'Recanto das Emas',
      'Riacho Fundo',
      'Núcleo Bandeirante',
      'Brazlândia',
      'Paranoá',
      'Itapoã',
      'Vicente Pires',
      'Candangolândia',
      'Cruzeiro',
      'Lago Sul',
      'Lago Norte',
      'Park Way',
    ],
  },

  {
    uf: 'GO',
    name: 'Goiás',
    cities: [
      'Goiânia',
      'Anápolis',
      'Aparecida de Goiânia',
      'Águas Lindas de Goiás',
      'Formosa',
      'Luziânia',
      'Planaltina',
      'Valparaíso de Goiás',
      'Novo Gama',
      'Cristalina',
    ],
  },

  // Demais estados serão adicionados aqui.
];

import { Testimonial } from '../models/testimonial.model';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Ana Martins',
    location: 'Brasília, DF',
    category: 'FÉ E SUPERAÇÃO',
    title: 'Uma nova história começou',
    content: [
    'Depois de um período difícil, encontrei na fé a força necessária para continuar.',
    'Durante esse período, aprendi a confiar novamente e percebi que não precisava enfrentar tudo sozinha.',
    'Hoje posso olhar para trás e perceber o quanto Deus transformou minha história.'
    ],
    initials: 'AM',
    imageUrl: '/testimonials/ana-martins.jpg',
  },
  {
    id: 2,
    name: 'Carlos Oliveira',
    location: 'Goiânia, GO',
    category: 'FAMÍLIA',
    title: 'Minha família foi restaurada',
    content: [
    'Em meio às dificuldades, aprendemos a caminhar juntos novamente.',
    'A oração e a comunhão foram fundamentais nesse processo.',
    'Hoje nossa família entende ainda mais o valor de permanecer unida e buscar a Deus.'
    ],
    initials: 'CO',
    imageUrl: '/testimonials/carlos-oliveira.jpg',
  },
  {
    id: 3,
    name: 'Gabriel Santos',
    location: 'São Paulo, SP',
    category: 'PROPÓSITO',
    title: 'Descobri meu propósito',
    content: [
    'Durante minha caminhada comecei a entender que minha vida poderia servir a um propósito maior.',
    'Passei a enxergar meus dons e experiências de uma maneira diferente.',
    'Hoje quero usar aquilo que aprendi para ajudar outras pessoas.'
    ],
    initials: 'GS',
    imageUrl: '/testimonials/gabriel-santos.jpg',
  },
  {
    id: 4,
    name: 'João Santos',
    location: 'Goiânia, GO',
    category: 'Superação',
    title: 'A fé me ajudou a recomeçar',
    initials: 'JS',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    mediaType: 'video',
    content: [
      'Durante um período de dificuldades, encontrei força para continuar.',
      'Hoje compartilho essa história para encorajar outras pessoas.',
    ],
  },
  {
    id: 5,
    name: 'Ana Souza',
    location: 'Planaltina, GO',
    category: 'Família',
    title: 'Uma transformação dentro de casa',
    initials: 'AS',
    imageUrl: '/testimonials/ana.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    mediaType: 'both',
    content: [
      'Nossa família passou por um momento de grandes desafios.',
      'Com fé, diálogo e apoio, conseguimos reconstruir nossa história.',
    ],
  },
];

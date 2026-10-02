import { Ministry } from '../models/ministry.model';

export const MINISTRIES: Ministry[] = [

// ==========================================
// CRIANÇAS
// ==========================================
{
  id: 1,
  name: 'Crianças',
  description:
    'Um espaço preparado para ensinar a Palavra de Deus, desenvolver valores cristãos e ajudar cada criança a crescer na fé.',
  imageUrl: '/ministries/criancas.jpg',
  route: '/ministerio/criancas',
  headline: 'Formando uma nova geração na fé.',

  content: [
    'O Ministério de Crianças nasceu com o propósito de proporcionar um ambiente seguro, acolhedor e alegre, onde cada criança possa conhecer a Palavra de Deus e desenvolver sua fé desde os primeiros anos de vida.',

    'Acreditamos que ensinar princípios cristãos às crianças vai muito além de transmitir conhecimento. Queremos ajudá-las a compreender o amor de Deus, desenvolver valores, aprender a orar e descobrir que elas também fazem parte da comunidade de fé.',

    'Por meio de histórias bíblicas, músicas, atividades educativas, brincadeiras, momentos de oração e relacionamentos saudáveis, buscamos tornar cada encontro uma oportunidade de aprendizado, comunhão e crescimento.',

    'Nosso desejo é trabalhar em parceria com as famílias, contribuindo para que os ensinamentos aprendidos na igreja também façam parte da rotina e da formação de cada criança.'
  ],

  activities: [
    {
        title: 'Ensino bíblico',
        description:
          'Momentos preparados especialmente para apresentar histórias e ensinamentos da Bíblia de maneira simples, didática e adequada para cada faixa etária.',
        imageUrl: '/ministries/activities/criancas-ensino-biblico.jpg'
      },

      {
        title: 'Atividades educativas',
        description:
          'Dinâmicas, desenhos, atividades e experiências que ajudam as crianças a compreenderem os princípios ensinados durante os encontros.',
        imageUrl: '/ministries/activities/criancas-atividades.jpg'
      },

      {
        title: 'Momentos de oração',
        description:
          'Ensinamos as crianças a desenvolverem uma vida de oração, apresentando a Deus seus sentimentos, necessidades, agradecimentos e pedidos.',
        imageUrl: '/ministries/activities/criancas-oracao.jpg'
      },

      {
        title: 'Músicas e louvor',
        description:
          'Momentos de música e louvor que ajudam as crianças a expressarem sua fé de maneira alegre e participativa.',
        imageUrl: '/ministries/activities/criancas-louvor.jpg'
      },

      {
        title: 'Dinâmicas e brincadeiras',
        description:
          'Atividades recreativas que estimulam a interação, a amizade, a cooperação e o aprendizado de valores cristãos.',
        imageUrl: '/ministries/activities/criancas-brincadeiras.jpg'
      },
    ],
  },

// ==========================================
// HOMENS
// ==========================================
  {
    id: 2,
    name: 'Homens',
    description:
      'Encontros voltados para crescimento espiritual, comunhão, discipulado e fortalecimento dos homens em sua caminhada com Deus.',
    imageUrl: '/ministries/homens.jpg',
    route: '/ministerio/homens',
    headline: 'Homens fortalecidos para servir.',

    content: [
      'O Ministério de Homens tem como propósito criar um ambiente de comunhão, aprendizado e crescimento espiritual, ajudando cada homem a fortalecer sua caminhada com Deus.',

      'Acreditamos que homens fortalecidos na fé podem exercer uma influência positiva dentro de suas famílias, na igreja, no trabalho e na sociedade. Por isso, buscamos desenvolver princípios de responsabilidade, liderança, caráter e serviço.',

      'Por meio de estudos bíblicos, encontros, momentos de oração, discipulado e ações práticas, incentivamos cada participante a desenvolver um relacionamento mais profundo com Deus e a colocar sua fé em prática.',

      'Nosso desejo é formar homens dispostos a servir, cuidar de suas famílias, apoiar outras pessoas e participar ativamente da missão da igreja e da comunidade.',
    ],

    activities: [
      {
        title: 'Estudos bíblicos',
        description:
          'Encontros dedicados ao estudo da Palavra de Deus, promovendo conhecimento, reflexão e aplicação dos ensinamentos bíblicos na vida cotidiana.',
        imageUrl:
          '/ministries/activities/homens-estudos.jpg',
      },

      {
        title: 'Encontros de comunhão',
        description:
          'Momentos de convivência e relacionamento que fortalecem amizades, vínculos e a união entre os homens da comunidade.',
        imageUrl:
          '/ministries/activities/homens-comunhao.jpg',
      },

      {
        title: 'Discipulado',
        description:
          'Momentos de acompanhamento, orientação e crescimento espiritual, incentivando maturidade na fé e compromisso com Deus.',
        imageUrl:
          '/ministries/activities/homens-discipulado.jpg',
      },

      {
        title: 'Momentos de oração',
        description:
          'Encontros dedicados à oração e intercessão, buscando a direção de Deus para a vida pessoal, familiar e ministerial.',
        imageUrl:
          '/ministries/activities/homens-oracao.jpg',
      },

      {
        title: 'Ações de serviço',
        description:
          'Projetos e iniciativas que incentivam os homens a colocarem a fé em prática através do cuidado, serviço e apoio às pessoas e comunidades.',
        imageUrl:
          '/ministries/activities/homens-servico.jpg',
      },
    ],
  },


// ==========================================
// MULHERES
// ==========================================
  {
    id: 3,
    name: 'Mulheres',
    description:
      'Um ambiente de comunhão, cuidado e crescimento, onde mulheres compartilham experiências e fortalecem umas às outras na fé.',
    imageUrl: '/ministries/mulheres.jpg',
    route: '/ministerio/mulheres',
    headline: 'Mulheres crescendo juntas na fé.',

    content: [
      'O Ministério de Mulheres foi criado para proporcionar um ambiente de acolhimento, comunhão e crescimento espiritual, onde cada mulher possa desenvolver sua fé e seus relacionamentos.',

      'Acreditamos na importância de caminhar juntas, compartilhando experiências, aprendizados, desafios e conquistas. O relacionamento entre as mulheres pode ser uma fonte importante de encorajamento e fortalecimento.',

      'Através de encontros, estudos bíblicos, momentos de oração, discipulado e ações sociais, buscamos criar oportunidades para que cada mulher desenvolva seus dons e compreenda melhor seu propósito.',

      'Nosso desejo é que cada participante encontre um espaço onde possa ser acolhida, fortalecida e incentivada a viver sua fé dentro da família, da igreja e da sociedade.',
    ],

    activities: [
      {
        title: 'Encontros de comunhão',
        description:
          'Momentos de acolhimento, amizade e compartilhamento de experiências que fortalecem os relacionamentos entre as mulheres.',
        imageUrl:
          '/ministries/activities/mulheres-comunhao.jpg',
      },

      {
        title: 'Estudos bíblicos',
        description:
          'Encontros dedicados ao estudo da Palavra de Deus e à reflexão sobre seus ensinamentos e aplicações para a vida cotidiana.',
        imageUrl:
          '/ministries/activities/mulheres-estudos.jpg',
      },

      {
        title: 'Momentos de oração',
        description:
          'Momentos de oração e intercessão que proporcionam um espaço para buscar a Deus e apresentar diferentes necessidades.',
        imageUrl:
          '/ministries/activities/mulheres-oracao.jpg',
      },

      {
        title: 'Discipulado',
        description:
          'Relacionamentos de acompanhamento e crescimento espiritual que incentivam cada mulher em sua caminhada de fé.',
        imageUrl:
          '/ministries/activities/mulheres-discipulado.jpg',
      },

      {
        title: 'Ações sociais',
        description:
          'Iniciativas voltadas ao cuidado com pessoas e comunidades, demonstrando o amor de Deus através de ações de apoio e serviço.',
        imageUrl:
          '/ministries/activities/mulheres-social.jpg',
      },
    ],
  },

  // ==========================================
  // JOVENS
  // ==========================================
  {
    id: 4,
    name: 'Jovens',
    description:
      'Um espaço para jovens desenvolverem sua fé, descobrirem seu propósito e viverem o evangelho de forma relevante em sua geração.',
    imageUrl: '/ministries/jovens.jpg',
    route: '/ministerio/jovens',
    headline: 'Uma geração vivendo com propósito.',

    content: [
      'O Ministério de Jovens busca criar um espaço de amizade, aprendizado e crescimento, onde cada jovem possa desenvolver sua fé, fortalecer seus relacionamentos e descobrir seu propósito.',

      'Sabemos que os jovens enfrentam diferentes desafios em sua caminhada. Por isso, queremos proporcionar um ambiente onde possam fazer perguntas, compartilhar experiências, aprender a Palavra de Deus e crescer juntos.',

      'Por meio de encontros, estudos bíblicos, louvor, momentos de oração, projetos e ações de serviço, incentivamos os jovens a desenvolverem seus dons e a viverem o evangelho de maneira relevante em sua geração.',

      'Nosso desejo é formar uma geração comprometida com Deus, consciente de seu propósito e disposta a utilizar seus talentos para servir outras pessoas e contribuir para a transformação da sociedade.',
    ],

    activities: [
      {
        title: 'Encontros de jovens',
        description:
          'Momentos de comunhão, amizade e aprendizado para que os jovens possam desenvolver relacionamentos saudáveis e fortalecer sua fé.',
        imageUrl:
          '/ministries/activities/jovens-encontros.jpg',
      },

      {
        title: 'Estudos bíblicos',
        description:
          'Encontros que ajudam os jovens a conhecer melhor a Bíblia e refletir sobre como viver sua fé no contexto da sociedade atual.',
        imageUrl:
          '/ministries/activities/jovens-estudos.jpg',
      },

      {
        title: 'Louvor e adoração',
        description:
          'Momentos de louvor e adoração que proporcionam aos jovens uma oportunidade de expressar sua fé e buscar a presença de Deus.',
        imageUrl:
          '/ministries/activities/jovens-louvor.jpg',
      },

      {
        title: 'Momentos de oração',
        description:
          'Encontros dedicados à oração e intercessão, incentivando os jovens a desenvolverem uma vida de relacionamento com Deus.',
        imageUrl:
          '/ministries/activities/jovens-oracao.jpg',
      },

      {
        title: 'Ações e projetos',
        description:
          'Projetos que incentivam os jovens a servirem outras pessoas, desenvolverem seus dons e colocarem sua fé em prática.',
        imageUrl:
          '/ministries/activities/jovens-projetos.jpg',
      },
    ],
  },
];

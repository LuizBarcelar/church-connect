export interface Testimonial {
  id: number;
  name: string;
  location: string;
  category: string;
  title: string;
  content: string[];
  initials: string;

  /**
   * Foto principal do testemunho.
   * Pode ser uma imagem local ou uma URL.
   */
  imageUrl?: string;

  /**
   * Vídeo do relato.
   * Pode ser uma URL do YouTube, Vimeo ou arquivo hospedado.
   */
  videoUrl?: string;

  /**
   * Tipo de mídia disponível no testemunho.
   */
  mediaType?: 'none' | 'image' | 'video' | 'both';
}

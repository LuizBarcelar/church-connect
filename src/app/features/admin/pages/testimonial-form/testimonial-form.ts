import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  DomSanitizer,
  SafeResourceUrl,
} from '@angular/platform-browser';

import {
  ArrowLeft,
  ExternalLink,
  Image,
  LucideAngularModule,
  Save,
  Video,
} from 'lucide-angular';

import { Testimonial } from '../../../testimonials/models/testimonial.model';

@Component({
  selector: 'app-testimonial-form',
  imports: [
    FormsModule,
    LucideAngularModule,
  ],
  templateUrl: './testimonial-form.html',
  styleUrl: './testimonial-form.css',
})
export class TestimonialForm implements OnInit {
  @Input() testimonial: Testimonial | null = null;

  @Output() saved = new EventEmitter<Testimonial>();
  @Output() cancelled = new EventEmitter<void>();

  protected readonly ArrowLeft = ArrowLeft;
  protected readonly ExternalLink = ExternalLink;
  protected readonly Image = Image;
  protected readonly Save = Save;
  protected readonly Video = Video;

  protected name = '';
  protected location = '';
  protected category = '';
  protected title = '';
  protected initials = '';
  protected imageUrl = '';
  protected videoUrl = '';
  protected content = '';

  protected submitted = false;

  constructor(
    private readonly sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    if (!this.testimonial) {
      return;
    }

    this.name = this.testimonial.name;
    this.location = this.testimonial.location;
    this.category = this.testimonial.category;
    this.title = this.testimonial.title;
    this.initials = this.testimonial.initials;
    this.imageUrl = this.testimonial.imageUrl ?? '';
    this.videoUrl = this.testimonial.videoUrl ?? '';
    this.content = this.testimonial.content.join('\n\n');
  }

  /*
   * =========================
   * PRÉ-VISUALIZAÇÃO DO VÍDEO
   * =========================
   */

  protected get videoEmbedUrl(): SafeResourceUrl | null {
    const url = this.videoUrl.trim();

    if (!url) {
      return null;
    }

    const videoId = this.getYouTubeVideoId(url);

    if (!videoId) {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`,
    );
  }

  private getYouTubeVideoId(url: string): string | null {
    const patterns = [
      /youtube\.com\/watch\?v=([^&]+)/,
      /youtu\.be\/([^?&]+)/,
      /youtube\.com\/embed\/([^?&]+)/,
      /youtube\.com\/shorts\/([^?&]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);

      if (match?.[1]) {
        return match[1];
      }
    }

    return null;
  }

  /*
   * =========================
   * SALVAR
   * =========================
   */

  protected submitForm(): void {
    this.submitted = true;

    if (
      !this.name.trim() ||
      !this.location.trim() ||
      !this.category.trim() ||
      !this.title.trim() ||
      !this.content.trim()
    ) {
      return;
    }

    const hasImage = Boolean(this.imageUrl.trim());
    const hasVideo = Boolean(this.videoUrl.trim());

    let mediaType: Testimonial['mediaType'] = 'none';

    if (hasImage && hasVideo) {
      mediaType = 'both';
    } else if (hasImage) {
      mediaType = 'image';
    } else if (hasVideo) {
      mediaType = 'video';
    }

    const testimonialId =
      this.testimonial?.id ?? Date.now();

    const testimonial: Testimonial = {
      id: testimonialId,

      name: this.name.trim(),
      location: this.location.trim(),
      category: this.category.trim(),
      title: this.title.trim(),

      initials:
        this.initials.trim() ||
        this.name
          .trim()
          .split(' ')
          .map((namePart) => namePart.charAt(0))
          .join('')
          .slice(0, 2)
          .toUpperCase(),

      imageUrl:
        this.imageUrl.trim() || undefined,

      videoUrl:
        this.videoUrl.trim() || undefined,

      mediaType,

      content: this.content
        .split(/\n+/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
    };

    this.saved.emit(testimonial);
  }

  /*
   * =========================
   * CANCELAR
   * =========================
   */

  protected cancel(): void {
    this.cancelled.emit();
  }
}
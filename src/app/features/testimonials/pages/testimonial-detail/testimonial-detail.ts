import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  DomSanitizer,
  SafeResourceUrl,
} from '@angular/platform-browser';

import { Testimonial } from '../../models/testimonial.model';
import { TestimonialService } from '../../../../core/services/testimonial.service';

@Component({
  selector: 'app-testimonial-detail',
  imports: [RouterLink],
  templateUrl: './testimonial-detail.html',
  styleUrl: './testimonial-detail.css',
})
export class TestimonialDetail implements OnInit {
  protected testimonial: Testimonial | undefined;
  protected safeVideoUrl: SafeResourceUrl | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly sanitizer: DomSanitizer,
    private readonly testimonialService: TestimonialService,
  ) {}

  ngOnInit(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id'),
    );

    this.testimonial = this.testimonialService.getById(id);

    if (this.testimonial?.videoUrl) {
      this.safeVideoUrl = this.getSafeVideoUrl(
        this.testimonial.videoUrl,
      );
    }
  }

  private getSafeVideoUrl(
    url: string,
  ): SafeResourceUrl | null {
    try {
      const parsedUrl = new URL(url);

      const isYoutube =
        parsedUrl.hostname === 'youtube.com' ||
        parsedUrl.hostname === 'www.youtube.com' ||
        parsedUrl.hostname === 'youtu.be';

      if (!isYoutube) {
        return null;
      }

      let videoId = '';

      if (parsedUrl.hostname === 'youtu.be') {
        videoId = parsedUrl.pathname.replace('/', '');
      } else if (parsedUrl.pathname === '/watch') {
        videoId = parsedUrl.searchParams.get('v') ?? '';
      } else if (parsedUrl.pathname.startsWith('/embed/')) {
        videoId = parsedUrl.pathname
          .split('/embed/')[1]
          .split('/')[0];
      }

      if (!videoId || videoId === 'VIDEO_ID') {
        return null;
      }

      return this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${videoId}`,
      );
    } catch {
      return null;
    }
  }
}

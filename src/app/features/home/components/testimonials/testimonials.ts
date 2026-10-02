import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TestimonialCard } from '../../../testimonials/components/testimonial-card/testimonial-card';
import { TESTIMONIALS } from '../../../testimonials/data/testimonials.data';

@Component({
  selector: 'app-testimonials',
  imports: [
    RouterLink,
    TestimonialCard
  ],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials {
  protected readonly testimonials = TESTIMONIALS.slice(0, 3);
}

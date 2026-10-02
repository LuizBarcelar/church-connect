import { Component, OnInit } from '@angular/core';

import { TestimonialCard } from '../../components/testimonial-card/testimonial-card';
import { TestimonialService } from '../../../../core/services/testimonial.service';
import { Testimonial } from '../../models/testimonial.model';

@Component({
  selector: 'app-testimonials',
  imports: [TestimonialCard],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})

export class Testimonials implements OnInit {
  protected testimonials: Testimonial[] = [];

  constructor(
    private readonly testimonialService: TestimonialService,
  ) {}

  ngOnInit(): void {
    this.testimonials = this.testimonialService.getAll();
  }
}

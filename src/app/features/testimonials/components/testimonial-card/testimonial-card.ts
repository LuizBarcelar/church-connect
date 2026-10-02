import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Testimonial } from '../../models/testimonial.model';


@Component({
  selector: 'app-testimonial-card',
  imports: [RouterLink],
  templateUrl: './testimonial-card.html',
  styleUrl: './testimonial-card.css',
})
export class TestimonialCard {
  readonly testimonial = input.required<Testimonial>();
}

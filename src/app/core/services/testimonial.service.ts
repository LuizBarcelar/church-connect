import { Injectable } from '@angular/core';

import { TESTIMONIALS } from '../../features/testimonials/data/testimonials.data';
import { Testimonial } from '../../features/testimonials/models/testimonial.model';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  private readonly storageKey = 'church_testimonials';

  constructor() {
    this.initializeStorage();
  }

  getAll(): Testimonial[] {
    const storedTestimonials = localStorage.getItem(
      this.storageKey,
    );

    if (!storedTestimonials) {
      return [...TESTIMONIALS];
    }

    try {
      return JSON.parse(storedTestimonials) as Testimonial[];
    } catch {
      return [...TESTIMONIALS];
    }
  }

  getById(id: number): Testimonial | undefined {
    return this.getAll().find(
      (testimonial) => testimonial.id === id,
    );
  }

  saveAll(testimonialsList: Testimonial[]): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(testimonialsList),
    );
  }

  create(testimonial: Testimonial): Testimonial[] {
    const currentTestimonials = this.getAll();

    const updatedTestimonials = [
      ...currentTestimonials,
      testimonial,
    ];

    this.saveAll(updatedTestimonials);

    return updatedTestimonials;
  }

  update(testimonial: Testimonial): Testimonial[] {
    const currentTestimonials = this.getAll();

    const updatedTestimonials = currentTestimonials.map(
      (item) =>
        item.id === testimonial.id ? testimonial : item,
    );

    this.saveAll(updatedTestimonials);

    return updatedTestimonials;
  }

  delete(id: number): Testimonial[] {
    const currentTestimonials = this.getAll();

    const updatedTestimonials = currentTestimonials.filter(
      (item) => item.id !== id,
    );

    this.saveAll(updatedTestimonials);

    return updatedTestimonials;
  }

  private initializeStorage(): void {
    const storedTestimonials = localStorage.getItem(
      this.storageKey,
    );

    if (!storedTestimonials) {
      this.saveAll([...TESTIMONIALS]);
      return;
    }

    try {
      const savedTestimonials = JSON.parse(
        storedTestimonials,
      ) as Testimonial[];

      const savedIds = new Set(
        savedTestimonials.map(
          (testimonial) => testimonial.id,
        ),
      );

      const missingTestimonials = TESTIMONIALS.filter(
        (testimonial) => !savedIds.has(testimonial.id),
      );

      if (missingTestimonials.length > 0) {
        this.saveAll([
          ...savedTestimonials,
          ...missingTestimonials,
        ]);
      }
    } catch {
      this.saveAll([...TESTIMONIALS]);
    }
  }
}

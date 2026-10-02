import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TestimonialForm } from '../testimonial-form/testimonial-form';

import { TestimonialService } from '../../../../core/services/testimonial.service';
import { Testimonial } from '../../../testimonials/models/testimonial.model';

@Component({
  selector: 'app-admin-testimonials',
  imports: [FormsModule, TestimonialForm],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class AdminTestimonials {
  protected searchTerm = '';

  protected selectedTestimonial: Testimonial | null = null;

  protected showForm = false;

  protected showDeleteMessage = false;

  protected showSaveMessage = false;

  protected testimonialList: Testimonial[] = [];

  constructor(
    private readonly testimonialService: TestimonialService,
  ) {
    this.testimonialList = this.testimonialService.getAll();
  }

  protected get filteredTestimonials(): Testimonial[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.testimonialList;
    }

    return this.testimonialList.filter((testimonial) => {
      return (
        testimonial.name.toLowerCase().includes(term) ||
        testimonial.title.toLowerCase().includes(term) ||
        testimonial.category.toLowerCase().includes(term) ||
        testimonial.location.toLowerCase().includes(term)
      );
    });
  }

  protected get testimonialCategories(): number {
    return new Set(
      this.testimonialList.map((testimonial) => testimonial.category),
    ).size;
  }

  protected createTestimonial(): void {
    this.selectedTestimonial = null;
    this.showForm = true;
  }

  protected editTestimonial(testimonial: Testimonial): void {
    this.selectedTestimonial = testimonial;
    this.showForm = true;
  }

  protected closeForm(): void {
    this.showForm = false;
    this.selectedTestimonial = null;
  }

  protected saveTestimonial(testimonial: Testimonial): void {
    const existingTestimonial = this.testimonialList.some(
      (item) => item.id === testimonial.id,
    );

    if (existingTestimonial) {
      this.testimonialList = this.testimonialService.update(testimonial);
    } else {
      this.testimonialList = this.testimonialService.create(testimonial);
    }

    this.closeForm();

    this.showSaveMessage = true;

    window.setTimeout(() => {
      this.showSaveMessage = false;
    }, 3000);
  }

  protected deleteTestimonial(testimonial: Testimonial): void {
    const confirmed = window.confirm(
      `Deseja excluir o testemunho de ${testimonial.name}?`,
    );

    if (!confirmed) {
      return;
    }

    this.testimonialList = this.testimonialService.delete(
      testimonial.id,
    );

    this.showDeleteMessage = true;

    window.setTimeout(() => {
      this.showDeleteMessage = false;
    }, 3000);
  }

  protected getPreviewText(testimonial: Testimonial): string {
    return testimonial.content[0] ?? '';
  }
}

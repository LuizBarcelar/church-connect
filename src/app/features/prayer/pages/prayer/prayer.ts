import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { PrayerService } from '../../services/prayer.service';
import { CHURCH_INFO } from '../../../../core/data/church.data';

@Component({
  selector: 'app-prayer',
  imports: [FormsModule, RouterLink],
  templateUrl: './prayer.html',
  styleUrl: './prayer.css',
})
export class Prayer {
  protected submitted = false;

  protected readonly church = CHURCH_INFO;

  protected form = {
    name: '',
    email: '',
    message: '',
    isPrivate: true,
  };

  constructor(
    private readonly prayerService: PrayerService,
  ) {}

  protected submitPrayer(): void {
    if (
      !this.form.name.trim() ||
      !this.form.message.trim()
    ) {
      return;
    }

    this.prayerService.create({
      name: this.form.name.trim(),
      email: this.form.email.trim() || undefined,
      message: this.form.message.trim(),
      isPrivate: this.form.isPrivate,
    });

    this.submitted = true;
  }

  protected resetForm(): void {
    this.form = {
      name: '',
      email: '',
      message: '',
      isPrivate: true,
    };

    this.submitted = false;
  }
}

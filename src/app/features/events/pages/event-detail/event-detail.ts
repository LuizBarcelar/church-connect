import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  MessageCircle,
  Navigation,
  LucideAngularModule,
} from 'lucide-angular';

import { ChurchWeeklyEvent } from '../../../../core/models/church-settings.model';
import { ChurchSettingsService } from '../../../../core/services/church-settings.service';

@Component({
  selector: 'app-event-detail',
  imports: [
    DatePipe,
    RouterLink,
    LucideAngularModule,
  ],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly settingsService = inject(ChurchSettingsService);

  protected readonly ArrowLeft = ArrowLeft;
  protected readonly CalendarDays = CalendarDays;
  protected readonly Clock3 = Clock3;
  protected readonly MapPin = MapPin;
  protected readonly MessageCircle = MessageCircle;
  protected readonly Navigation = Navigation;

  protected readonly church = this.settingsService.getSettings();

  protected readonly event: ChurchWeeklyEvent | undefined =
    this.findEvent();

  private findEvent(): ChurchWeeklyEvent | undefined {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {
      return undefined;
    }

    return (this.church.weeklyEvents ?? []).find(
      (event) => event.id === id
    );
  }

  protected get whatsappUrl(): string {
    if (!this.event?.whatsapp) {
      return '';
    }

    const phone =
      this.event.whatsapp.replace(/\D/g, '');

    if (!phone) {
      return '';
    }

    const phoneWithCountryCode =
      phone.startsWith('55')
        ? phone
        : `55${phone}`;

    const message =
      `Olá! Gostaria de saber mais informações sobre o evento "${this.event.title}".`;

    return (
      `https://wa.me/${phoneWithCountryCode}` +
      `?text=${encodeURIComponent(message)}`
    );
  }

  protected get mapsUrl(): string {
    const address = this.church.address;

    const fullAddress = [
      address.block,
      address.set,
      address.lot,
      address.neighborhood,
      address.city,
      address.state,
      address.cep,
    ]
      .filter(Boolean)
      .join(', ');

    return (
      'https://www.google.com/maps/dir/?api=1' +
      `&destination=${encodeURIComponent(fullAddress)}`
    );
  }

  protected get location(): string {
    const address = this.church.address;

    return [
      address.neighborhood,
      `${address.city} - ${address.state}`,
    ]
      .filter(Boolean)
      .join(' • ');
  }

  protected getHeroBackground(): string {
    if (!this.event?.imageUrl) {
      return 'none';
    }

    return `url("${this.event.imageUrl}")`;
  }

  protected getContactBackground(): string {
    if (!this.event?.imageUrl) {
      return 'none';
    }

    return `url("${this.event.imageUrl}")`;
  }

  protected get titleFirstLine(): string {
    if (!this.event?.title) {
      return '';
    }

    const title = this.event.title.trim();

    if (title.toLowerCase().includes('santa ceia')) {
      return title.replace(/santa ceia/i, '').trim();
    }

    const words = title.split(/\s+/);

    if (words.length === 1) {
      return words[0];
    }

    return words.slice(0, -1).join(' ');
  }

  protected get titleHighlight(): string {
    if (!this.event?.title) {
      return '';
    }

    const title = this.event.title.trim();

    if (title.toLowerCase().includes('santa ceia')) {
      return 'Santa Ceia';
    }

    const words = title.split(/\s+/);

    if (words.length === 1) {
      return '';
    }

    return words[words.length - 1];
  }
}

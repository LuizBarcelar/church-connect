import { Component, inject } from '@angular/core';

import { ChurchSettings } from '../../../../core/models/church-settings.model';
import { ChurchSettingsService } from '../../../../core/services/church-settings.service';
import {
  DomSanitizer,
  SafeResourceUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'app-church-location',
  imports: [],
  templateUrl: './church-location.html',
  styleUrl: './church-location.css',
})
export class ChurchLocation {
  private readonly churchSettingsService =
    inject(ChurchSettingsService);

  private readonly sanitizer =
  inject(DomSanitizer);

  protected readonly church: ChurchSettings =
    this.churchSettingsService.getSettings();

  protected getWhatsappUrl(
    whatsapp: string
  ): string {
    const phone =
      whatsapp.replace(/\D/g, '');

    if (!phone) {
      return '';
    }

    const phoneWithCountryCode =
      phone.startsWith('55')
        ? phone
        : `55${phone}`;

    return `https://wa.me/${phoneWithCountryCode}`;
  }

  protected get mapsUrl(): string {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      this.fullAddress
    )}`;
  }

  protected get mapEmbedUrl(): SafeResourceUrl {
    const url =
      `https://www.google.com/maps?q=${encodeURIComponent(
        this.fullAddress
      )}&output=embed`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      url
    );
  }

  private get fullAddress(): string {
    const address = this.church.address;

    return [
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
  }
}

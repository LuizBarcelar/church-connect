import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ChurchSettings } from '../../../../core/models/church-settings.model';
import { ChurchSettingsService } from '../../../../core/services/church-settings.service';

@Component({
  selector: 'app-contact',
  imports: [RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly churchSettingsService =
    inject(ChurchSettingsService);

  protected readonly church: ChurchSettings =
    this.churchSettingsService.getSettings();

  protected getWhatsappUrl(
    whatsapp: string
  ): string {
    const phone = whatsapp.replace(/\D/g, '');

    if (!phone) {
      return '';
    }

    const phoneWithCountryCode =
      phone.startsWith('55')
        ? phone
        : `55${phone}`;

    return `https://wa.me/${phoneWithCountryCode}`;
  }
}

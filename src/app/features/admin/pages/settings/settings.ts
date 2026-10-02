import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  Building2,
  CalendarDays,
  Clock3,
  Facebook,
  Globe2,
  Instagram,
  LucideAngularModule,
  Mail,
  MapPin,
  MessageCircle,
  Plus,
  RotateCcw,
  Save,
  Settings2,
  Trash2,
  Youtube,
} from 'lucide-angular';

import {
  ChurchServiceSchedule,
  ChurchSettings,
  ChurchWeeklyEvent,
} from '../../../../core/models/church-settings.model';

import {
  ChurchSettingsService,
} from '../../../../core/services/church-settings.service';

@Component({
  selector: 'app-settings',
  imports: [
    FormsModule,
    LucideAngularModule,
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
  private readonly settingsService =
    inject(ChurchSettingsService);

  protected settings!: ChurchSettings;

  protected saved = false;

  @ViewChild('successMessage')
  private successMessage?: ElementRef<HTMLElement>;

  protected readonly Settings2 = Settings2;
  protected readonly Building2 = Building2;
  protected readonly MapPin = MapPin;
  protected readonly MessageCircle = MessageCircle;
  protected readonly Mail = Mail;
  protected readonly Instagram = Instagram;
  protected readonly Facebook = Facebook;
  protected readonly Youtube = Youtube;
  protected readonly Globe2 = Globe2;
  protected readonly CalendarDays = CalendarDays;
  protected readonly Clock3 = Clock3;
  protected readonly Plus = Plus;
  protected readonly Trash2 = Trash2;
  protected readonly Save = Save;
  protected readonly RotateCcw = RotateCcw;

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(): void {
    this.settings =
      this.settingsService.getSettings();

    // Compatibilidade com configurações
    // salvas antes da programação semanal.
    this.settings.weeklyEvents ??= [];
  }

  // =========================
  // HORÁRIOS REGULARES
  // =========================

  protected addSchedule(): void {
    this.settings.services.push({
      day: '',
      times: [''],
    });
  }

  protected removeSchedule(
    index: number
  ): void {
    this.settings.services.splice(
      index,
      1
    );
  }

  protected addTime(
    schedule: ChurchServiceSchedule
  ): void {
    schedule.times.push('');
  }

  protected removeTime(
    schedule: ChurchServiceSchedule,
    index: number
  ): void {
    if (schedule.times.length === 1) {
      schedule.times[0] = '';
      return;
    }

    schedule.times.splice(index, 1);
  }

  protected updateTime(
    schedule: ChurchServiceSchedule,
    index: number,
    value: string
  ): void {
    schedule.times[index] = value;
  }

  // =========================
  // PROGRAMAÇÃO DA SEMANA
  // =========================

  protected addWeeklyEvent(): void {
    const events =
      this.settings.weeklyEvents ?? [];

    const nextId =
      events.length === 0
        ? 1
        : Math.max(
            ...events.map(
              (event) => event.id
            )
          ) + 1;

    this.settings.weeklyEvents.push({
      id: nextId,
      title: '',
      date: '',
      time: '',
      description: '',
      imageUrl: '',
      whatsapp: '',
    });
  }

  protected removeWeeklyEvent(
    index: number
  ): void {
    this.settings.weeklyEvents.splice(
      index,
      1
    );
  }

  // =========================
  // FORMATAÇÃO
  // =========================

  protected formatCep(): void {
    const numbers =
      this.settings.address.cep
        .replace(/\D/g, '')
        .slice(0, 8);

    if (numbers.length > 5) {
      this.settings.address.cep =
        `${numbers.slice(0, 5)}-${numbers.slice(5)}`;

      return;
    }

    this.settings.address.cep =
      numbers;
  }

  protected formatWhatsapp(): void {
    let numbers =
      this.settings.contact.whatsapp
        .replace(/\D/g, '');

    if (
      numbers.startsWith('55') &&
      numbers.length > 11
    ) {
      numbers = numbers.slice(2);
    }

    numbers = numbers.slice(0, 11);

    if (numbers.length <= 2) {
      this.settings.contact.whatsapp =
        numbers;

      return;
    }

    if (numbers.length <= 6) {
      this.settings.contact.whatsapp =
        `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;

      return;
    }

    if (numbers.length <= 10) {
      this.settings.contact.whatsapp =
        `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;

      return;
    }

    this.settings.contact.whatsapp =
      `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  }

  protected formatEventWhatsapp(
    event: ChurchWeeklyEvent
  ): void {
    let value = event.whatsapp?.replace(/\D/g, '') ?? '';

    value = value.slice(0, 11);

    if (value.length <= 2) {
      event.whatsapp = value
        ? `(${value}`
        : '';

      return;
    }

    if (value.length <= 6) {
      event.whatsapp =
        `(${value.slice(0, 2)}) ` +
        value.slice(2);

      return;
    }

    if (value.length <= 10) {
      event.whatsapp =
        `(${value.slice(0, 2)}) ` +
        `${value.slice(2, 6)}-` +
        value.slice(6);

      return;
    }

    event.whatsapp =
      `(${value.slice(0, 2)}) ` +
      `${value.slice(2, 7)}-` +
      value.slice(7);
  }

  // =========================
  // SALVAR / RESTAURAR
  // =========================

  protected saveSettings(): void {
    this.settings =
      this.settingsService.save(
        this.settings
      );

    this.saved = true;

    window.setTimeout(() => {
      this.successMessage?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 50);

    window.setTimeout(() => {
      this.saved = false;
    }, 3000);
  }

  protected resetSettings(): void {
    const confirmed =
      window.confirm(
        'Deseja restaurar as configurações originais da igreja?'
      );

    if (!confirmed) {
      return;
    }

    this.settings =
      this.settingsService.reset();

    this.settings.weeklyEvents ??= [];

    this.saved = false;
  }
}

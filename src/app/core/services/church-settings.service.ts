import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CHURCH_INFO } from '../data/church.data';

import {
  ChurchServiceSchedule,
  ChurchSettings,
} from '../models/church-settings.model';

@Injectable({
  providedIn: 'root',
})
export class ChurchSettingsService {
  private readonly storageKey = 'church_settings';

  private readonly settingsSubject =
    new BehaviorSubject<ChurchSettings>(
      this.loadInitialSettings()
    );

  readonly settings$ =
    this.settingsSubject.asObservable();

  getSettings(): ChurchSettings {
    const storedSettings =
       this.getStoredSettings();

    if (storedSettings) {
      return storedSettings;
    }

    return this.cloneSettings(CHURCH_INFO);
  }

  save(
    settings: ChurchSettings
  ): ChurchSettings {
    const cleanSettings: ChurchSettings = {
      name: settings.name.trim(),

      contact: {
        whatsapp:
          settings.contact.whatsapp.trim(),

        email:
          settings.contact.email.trim(),

        instagram:
          settings.contact.instagram.trim(),

        facebook:
          settings.contact.facebook.trim(),

        youtube:
          settings.contact.youtube.trim(),
      },

      address: {
        cep:
          settings.address.cep.trim(),

        block:
          settings.address.block.trim(),

        set:
          settings.address.set.trim(),

        lot:
          settings.address.lot.trim(),

        neighborhood:
          settings.address.neighborhood.trim(),

        city:
          settings.address.city.trim(),

        state:
          settings.address.state.trim(),
      },

      services:
        this.cleanSchedules(
          settings.services
        ),

      weeklyEvents:
        (settings.weeklyEvents ?? [])
          .map((event) => ({
            id: event.id,
            title: event.title.trim(),
            date: event.date,
            time: event.time.trim(),
            description: event.description.trim(),
            imageUrl: event.imageUrl?.trim() || undefined,
            whatsapp: event.whatsapp?.trim() || undefined,
          }))
          .filter(
            (event) =>
              event.title &&
              event.date
          ),
    };

    this.saveToStorage(
      cleanSettings
    );

    const clonedSettings =
      this.cloneSettings(
        cleanSettings
      );

    /*
     * Avisa imediatamente todos os componentes
     * que estão usando settings$.
     */
    this.settingsSubject.next(
      clonedSettings
    );

    return this.cloneSettings(
      clonedSettings
    );
  }

  reset(): ChurchSettings {
    const settings =
      this.cloneSettings(
        CHURCH_INFO
      );

    this.saveToStorage(
      settings
    );

    this.settingsSubject.next(
      this.cloneSettings(settings)
    );

    return this.cloneSettings(
      settings
    );
  }

  private loadInitialSettings():
    ChurchSettings {
    const storedSettings =
      this.getStoredSettings();

    if (storedSettings) {
      return storedSettings;
    }

    const initialSettings =
      this.cloneSettings(
        CHURCH_INFO
      );

    this.saveToStorage(
      initialSettings
    );

    return initialSettings;
  }

  private saveToStorage(
    settings: ChurchSettings
  ): void {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(settings)
      );
    } catch (error) {
      console.error(
        'Erro ao salvar configurações:',
        error
      );
    }
  }

  private getStoredSettings():
    ChurchSettings | null {
    try {
      const stored =
        localStorage.getItem(
          this.storageKey
        );

      if (!stored) {
        return null;
      }

      const parsed =
        JSON.parse(
          stored
        ) as ChurchSettings;

      if (
        !parsed ||
        typeof parsed !== 'object'
      ) {
        return null;
      }

      return this.cloneSettings(
        parsed
      );
    } catch (error) {
      console.error(
        'Erro ao carregar configurações:',
        error
      );

      return null;
    }
  }

  private cleanSchedules(
    schedules: ChurchServiceSchedule[]
  ): ChurchServiceSchedule[] {
    return schedules
      .map((schedule) => ({
        day:
          schedule.day.trim(),

        times:
          schedule.times
            .map(
              (time) =>
                time.trim()
            )
            .filter(Boolean),
      }))
      .filter(
        (schedule) =>
          schedule.day &&
          schedule.times.length > 0
      );
  }

  private cloneSettings(
    settings: ChurchSettings
  ): ChurchSettings {
    return {
      ...settings,

      contact: {
        ...settings.contact,
      },

      address: {
        ...settings.address,
      },

      services:
        (settings.services ?? [])
          .map((service) => ({
            ...service,

            times: [
              ...service.times,
            ],
          })),

      weeklyEvents:
        (settings.weeklyEvents ?? [])
          .map((event) => ({
            ...event,
          })),
    };
  }
}

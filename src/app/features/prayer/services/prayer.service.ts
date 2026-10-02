import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PrayerRequest } from '../models/prayer-request.model';

@Injectable({
  providedIn: 'root',
})
export class PrayerService {
  private readonly storageKey =
    'church_prayer_requests';

  private readonly requestsSubject =
    new BehaviorSubject<PrayerRequest[]>(
      this.getAll()
    );

  readonly requests$ =
    this.requestsSubject.asObservable();

  getAll(): PrayerRequest[] {
    const stored =
      localStorage.getItem(
        this.storageKey
      );

    if (!stored) {
      return [];
    }

    try {
      return JSON.parse(
        stored
      ) as PrayerRequest[];
    } catch {
      return [];
    }
  }

  getById(
    id: number
  ): PrayerRequest | undefined {
    return this.getAll().find(
      (request) =>
        request.id === id
    );
  }

  create(
    request: Omit<
      PrayerRequest,
      'id' | 'createdAt' | 'status'
    >
  ): PrayerRequest {
    const requests =
      this.getAll();

    const newRequest:
      PrayerRequest = {
        ...request,

        id:
          Date.now(),

        status:
          'pending',

        createdAt:
          new Date().toISOString(),
      };

    requests.unshift(
      newRequest
    );

    this.saveAll(
      requests
    );

    return newRequest;
  }

  update(
    request: PrayerRequest
  ): void {
    const requests =
      this.getAll();

    const index =
      requests.findIndex(
        (item) =>
          item.id === request.id
      );

    if (index === -1) {
      return;
    }

    requests[index] =
      request;

    this.saveAll(
      requests
    );
  }

  delete(
    id: number
  ): void {
    const requests =
      this.getAll().filter(
        (request) =>
          request.id !== id
      );

    this.saveAll(
      requests
    );
  }

  private saveAll(
    requests: PrayerRequest[]
  ): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(requests)
    );

    this.requestsSubject.next(
      [...requests]
    );
  }
}

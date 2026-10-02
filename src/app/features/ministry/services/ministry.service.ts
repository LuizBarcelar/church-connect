import { Injectable } from '@angular/core';

import { MINISTRIES } from '../data/ministries.data';
import { Ministry } from '../models/ministry.model';
import { MinistryActivity } from '../models/ministry-activity.model';

@Injectable({
  providedIn: 'root',
})
export class MinistryService {

  private readonly storageKey = 'church_ministries';

  getAll(): Ministry[] {
    const storedMinistries = this.getStoredMinistries();

    if (storedMinistries) {
      return storedMinistries;
    }

    const initialMinistries = this.cloneMinistries(MINISTRIES);

    this.saveAll(initialMinistries);

    return initialMinistries;
  }

  getById(id: number): Ministry | undefined {
    return this.getAll().find(
      (ministry) => ministry.id === id
    );
  }

  getByRoute(route: string): Ministry | undefined {
    const normalizedRoute = this.normalizeRoute(route);

    return this.getAll().find((ministry) => {
      return this.normalizeRoute(ministry.route) === normalizedRoute;
    });
  }

  getByName(name: string): Ministry | undefined {
    const normalizedName = this.normalizeText(name);

    return this.getAll().find((ministry) => {
      const routeName = this.getRouteName(ministry.route);

      return (
        this.normalizeText(ministry.name) === normalizedName ||
        this.normalizeText(routeName) === normalizedName
      );
    });
  }

  create(ministry: Ministry): Ministry[] {
    const ministries = this.getAll();

    const newMinistry: Ministry = {
      ...ministry,
      id: this.generateId(ministries),
      route: this.createRoute(ministry),
      content: [...ministry.content],
      activities: this.cloneActivities(ministry.activities),
    };

    const updatedMinistries = [
      ...ministries,
      newMinistry,
    ];

    this.saveAll(updatedMinistries);

    return updatedMinistries;
  }

  update(ministry: Ministry): Ministry[] {
    const ministries = this.getAll();

    const updatedMinistries = ministries.map(
      (currentMinistry) => {

        if (currentMinistry.id !== ministry.id) {
          return currentMinistry;
        }

        return {
          ...ministry,
          route: this.createRoute(ministry),
          content: [...ministry.content],
          activities: this.cloneActivities(
            ministry.activities
          ),
        };
      }
    );

    this.saveAll(updatedMinistries);

    return updatedMinistries;
  }

  delete(id: number): Ministry[] {
    const ministries = this.getAll();

    const updatedMinistries = ministries.filter(
      (ministry) => ministry.id !== id
    );

    this.saveAll(updatedMinistries);

    return updatedMinistries;
  }

  saveAll(ministries: Ministry[]): void {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(ministries)
      );
    } catch (error) {
      console.error(
        'Erro ao salvar ministérios:',
        error
      );
    }
  }

  private getStoredMinistries(): Ministry[] | null {
    try {
      const storedData = localStorage.getItem(
        this.storageKey
      );

      if (!storedData) {
        return null;
      }

      const parsedData = JSON.parse(
        storedData
      ) as Ministry[];

      if (!Array.isArray(parsedData)) {
        return null;
      }

      return parsedData;
    } catch (error) {
      console.error(
        'Erro ao carregar ministérios:',
        error
      );

      return null;
    }
  }

  private generateId(
    ministries: Ministry[]
  ): number {

    if (ministries.length === 0) {
      return 1;
    }

    return (
      Math.max(
        ...ministries.map(
          (ministry) => ministry.id
        )
      ) + 1
    );
  }

  private createRoute(
    ministry: Ministry
  ): string {

    const currentRouteName =
      this.getRouteName(ministry.route);

    const routeName =
      currentRouteName ||
      this.createSlug(ministry.name);

    return `/ministerio/${routeName}`;
  }

  private getRouteName(route: string): string {
    return route
      .replace(/^\/+/, '')
      .replace(/^ministerio\//, '')
      .replace(/\/+$/, '');
  }

  private createSlug(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private normalizeText(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  private normalizeRoute(route: string): string {
    return route
      .trim()
      .toLowerCase()
      .replace(/\/+$/, '');
  }

  private cloneMinistries(
    ministries: Ministry[]
  ): Ministry[] {

    return ministries.map((ministry) => ({
      ...ministry,

      content: [
        ...ministry.content,
      ],

      activities:
        this.cloneActivities(
          ministry.activities
        ),
    }));
  }

  private cloneActivities(
    activities: MinistryActivity[]
  ): MinistryActivity[] {

    return activities.map((activity) => ({
      ...activity,
    }));
  }
}

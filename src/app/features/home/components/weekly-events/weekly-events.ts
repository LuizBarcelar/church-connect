import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  CalendarDays,
  Clock3,
  ArrowRight,
  Sparkles,
  LucideAngularModule,
} from 'lucide-angular';

import {
  ChurchWeeklyEvent,
} from '../../../../core/models/church-settings.model';

import {
  ChurchSettingsService,
} from '../../../../core/services/church-settings.service';

@Component({
  selector: 'app-weekly-events',
  imports: [
    DatePipe,
    RouterLink,
    LucideAngularModule,
  ],
  templateUrl: './weekly-events.html',
  styleUrl: './weekly-events.css',
})
export class WeeklyEvents implements AfterViewInit {
  private readonly churchSettingsService =
    inject(ChurchSettingsService);

  @ViewChild('eventsTrack')
  private eventsTrack?: ElementRef<HTMLElement>;

  protected readonly CalendarDays = CalendarDays;
  protected readonly Clock3 = Clock3;
  protected readonly ArrowRight = ArrowRight;
  protected readonly Sparkles = Sparkles;

  protected readonly events =
    this.getUpcomingEvents();

  protected readonly carouselEvents =
    this.createInfiniteEvents();

  private isResetting = false;


  // =========================
  // CRIA CARROSSEL INFINITO
  // =========================

  private createInfiniteEvents(): ChurchWeeklyEvent[] {
    if (this.events.length <= 1) {
      return this.events;
    }

    return [
      ...this.events,
      ...this.events,
      ...this.events,
    ];
  }


  // =========================
  // POSIÇÃO INICIAL
  // =========================

  ngAfterViewInit(): void {
    if (this.events.length <= 1) {
      return;
    }

    requestAnimationFrame(() => {
      this.goToMiddleSet(false);
    });
  }


  // =========================
  // NAVEGAÇÃO
  // =========================

  protected scrollEvents(
    direction: 'left' | 'right'
  ): void {
    const track =
      this.eventsTrack?.nativeElement;

    if (!track) {
      return;
    }

    const cards =
      Array.from(
        track.querySelectorAll<HTMLElement>(
          '.event-banner'
        )
      );

    if (!cards.length) {
      return;
    }

    const trackCenter =
      track.scrollLeft +
      track.clientWidth / 2;

    let currentIndex = 0;
    let smallestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter =
        card.offsetLeft +
        card.offsetWidth / 2;

      const distance =
        Math.abs(
          cardCenter - trackCenter
        );

      if (distance < smallestDistance) {
        smallestDistance = distance;
        currentIndex = index;
      }
    });

    const targetIndex =
      direction === 'right'
        ? currentIndex + 1
        : currentIndex - 1;

    const targetCard =
      cards[targetIndex];

    if (!targetCard) {
      return;
    }

    const targetPosition =
      targetCard.offsetLeft -
      (
        track.clientWidth -
        targetCard.offsetWidth
      ) / 2;

    track.scrollTo({
      left: targetPosition,
      behavior: 'smooth',
    });
  }


  // =========================
  // MONITORA O SCROLL
  // =========================

  protected handleScroll(): void {
    if (this.isResetting) {
      return;
    }

    const track =
      this.eventsTrack?.nativeElement;

    if (!track || this.events.length <= 1) {
      return;
    }

    const distance =
      this.getCardDistance();

    if (!distance) {
      return;
    }

    const setWidth =
      distance * this.events.length;

    const currentScroll =
      track.scrollLeft;

    const leftLimit =
    distance * 0.5;

    const rightLimit =
      setWidth * 2 +
      distance * 0.5;

    if (currentScroll <= leftLimit) {
      this.resetScroll(
        currentScroll + setWidth
      );

      return;
    }

    /*
      Se entrou no terceiro conjunto,
      volta silenciosamente para o
      conjunto central equivalente.
    */
    if (currentScroll >= rightLimit) {
      this.resetScroll(
        currentScroll - setWidth
      );
    }
  }


  // =========================
  // RESET INVISÍVEL
  // =========================

  private resetScroll(
    position: number
  ): void {
    const track =
      this.eventsTrack?.nativeElement;

    if (!track) {
      return;
    }

    this.isResetting = true;

    track.scrollTo({
      left: position,
      behavior: 'instant',
    });

    requestAnimationFrame(() => {
      this.isResetting = false;
    });
  }


  // =========================
  // CONJUNTO CENTRAL
  // =========================

  private goToMiddleSet(
    smooth: boolean
  ): void {
    const track =
      this.eventsTrack?.nativeElement;

    if (!track) {
      return;
    }

    const cards =
      track.querySelectorAll<HTMLElement>(
        '.event-banner'
      );

    if (!cards.length) {
      return;
    }

    /*
      Primeiro evento do segundo conjunto.
    */
    const startIndex =
      this.events.length;

    /*
      Com 3 eventos:
      começa no evento central do
      conjunto central = Santa Ceia.
    */
    const middleEventIndex =
      Math.floor(this.events.length / 2);

    const targetCard =
      cards[
        startIndex + middleEventIndex
      ];

    if (!targetCard) {
      return;
    }

    const target =
      targetCard.offsetLeft -
      (
        track.clientWidth -
        targetCard.offsetWidth
      ) / 2;

    track.scrollTo({
      left: target,
      behavior:
        smooth
          ? 'smooth'
          : 'instant',
    });
  }


  // =========================
  // DISTÂNCIA ENTRE CARDS
  // =========================

  private getCardDistance(): number {
    const track =
      this.eventsTrack?.nativeElement;

    if (!track) {
      return 0;
    }

    const card =
      track.querySelector<HTMLElement>(
        '.event-banner'
      );

    if (!card) {
      return 0;
    }

    const styles =
      getComputedStyle(track);

    const gap =
      parseFloat(styles.columnGap) || 24;

    return card.offsetWidth + gap;
  }


  // =========================
  // EVENTOS FUTUROS
  // =========================

  private getUpcomingEvents(): ChurchWeeklyEvent[] {
    const settings =
      this.churchSettingsService.getSettings();

    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    return (settings.weeklyEvents ?? [])
      .filter((event) => {
        if (!event.date) {
          return false;
        }

        const eventDate =
          this.parseLocalDate(
            event.date
          );

        return eventDate >= today;
      })
      .sort((a, b) => {
        const dateA =
          this.parseLocalDate(
            a.date
          ).getTime();

        const dateB =
          this.parseLocalDate(
            b.date
          ).getTime();

        return dateA - dateB;
      });
  }


  // =========================
  // DATA LOCAL
  // =========================

  private parseLocalDate(
    value: string
  ): Date {
    const [year, month, day] =
      value
        .split('-')
        .map(Number);

    return new Date(
      year,
      month - 1,
      day
    );
  }
}

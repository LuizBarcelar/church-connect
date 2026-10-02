import { Injectable, inject } from '@angular/core';

import {
  BehaviorSubject,
  combineLatest,
} from 'rxjs';

import {
  CalendarDays,
  UserPlus,
  HandHeart,
} from 'lucide-angular';

import {
  AdminNotification,
} from '../models/admin-notification.model';

import {
  ChurchSettingsService,
} from './church-settings.service';

import {
  MemberService,
} from '../../features/members/services/member.service';

import {
  PrayerService,
} from '../../features/prayer/services/prayer.service';

@Injectable({
  providedIn: 'root',
})
export class AdminNotificationService {
  private readonly settingsService =
    inject(ChurchSettingsService);

  private readonly memberService =
    inject(MemberService);

  private readonly prayerService =
    inject(PrayerService);

  private readonly readStorageKey =
    'admin_notifications_read';

  private readonly notificationsSubject =
    new BehaviorSubject<AdminNotification[]>([]);

  readonly notifications$ =
    this.notificationsSubject.asObservable();

  constructor() {
    combineLatest([
      this.memberService.members$,
      this.prayerService.requests$,
      this.settingsService.settings$,
    ]).subscribe(() => {
      this.refresh();
    });
  }

  refresh(): void {
    this.notificationsSubject.next(
      this.getNotifications()
    );
  }

  // =================================
  // TODAS AS NOTIFICAÇÕES
  // =================================

  getNotifications(): AdminNotification[] {
    const notifications = [
      ...this.getPrayerNotifications(),
      ...this.getMemberNotifications(),
      ...this.getEventNotifications(),
    ];

    return notifications.sort(
      (a, b) =>
        b.sortDate.getTime() -
        a.sortDate.getTime()
    );
  }


  // =================================
  // TOTAL NÃO LIDO
  // =================================

  getUnreadCount(): number {
    return this.getNotifications()
      .filter(
        (notification) =>
          !notification.read
      )
      .length;
  }


  // =================================
  // MARCAR COMO LIDA
  // =================================

  markAsRead(id: string): void {
    const readIds =
      this.getReadIds();

    if (!readIds.includes(id)) {
       readIds.push(id);

       this.saveReadIds(readIds);
    }

    this.refresh();
  }


  // =================================
  // MARCAR TODAS COMO LIDAS
  // =================================

  markAllAsRead(): void {
    const currentIds =
      this.getNotifications()
        .map(
          (notification) =>
            notification.id
        );

    const readIds = [
      ...new Set([
        ...this.getReadIds(),
        ...currentIds,
      ]),
    ];

    this.saveReadIds(
      readIds
    );

    this.refresh();
  }

  // =================================
  // PEDIDOS DE ORAÇÃO PENDENTES
  // =================================

  private getPrayerNotifications():
    AdminNotification[] {

    const requests =
      this.prayerService.getAll();

    return requests
      .filter(
        (request) =>
          request.status === 'pending'
      )
      .map((request) => {
        const createdAt =
          new Date(request.createdAt);

        const id =
          `prayer-${request.id}`;

        return {
          id,

          type: 'prayer' as const,

          title:
            'Novo pedido de oração',

          description:
            request.isPrivate
              ? 'Pedido de oração privado'
              : `Pedido enviado por ${request.name}`,

          time:
            this.getRelativeCreatedTime(
              createdAt
            ),

          route:
            '/admin/oracoes',

          icon:
            HandHeart,

          read:
            this.isRead(id),

          sortDate:
            createdAt,
        };
      });
  }


  // =================================
  // NOVOS MEMBROS
  // =================================

  private getMemberNotifications():
    AdminNotification[] {

    const members =
      this.memberService.getAll();

    const today =
      new Date();

    /*
     * Mostra cadastros realizados
     * nos últimos 7 dias.
     */
    const limit =
      new Date(today);

    limit.setDate(
      limit.getDate() - 7
    );

    return members
      .filter((member) => {
        if (!member.createdAt) {
          return false;
        }

        const createdAt =
          new Date(member.createdAt);

        return (
          !Number.isNaN(
            createdAt.getTime()
          ) &&
          createdAt >= limit
        );
      })
      .map((member) => {
        const createdAt =
          new Date(member.createdAt);

        const id =
          `member-${member.id}`;

        return {
          id,

          type: 'member' as const,

          title: 'Novo membro cadastrado',

          description:
            member.fullName,

          time:
            this.getRelativeCreatedTime(
              createdAt
            ),

          route:
             `/admin/membros/${member.id}`,

          icon:
            UserPlus,

          read:
            this.isRead(id),

          sortDate:
            createdAt,
        };
      });
  }


  // =================================
  // EVENTOS PRÓXIMOS
  // =================================

  private getEventNotifications():
    AdminNotification[] {

    const settings =
      this.settingsService.getSettings();

    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const limit =
      new Date(today);

    /*
     * Eventos dos próximos 7 dias.
     */
    limit.setDate(
      limit.getDate() + 7
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

        return (
          eventDate >= today &&
          eventDate <= limit
        );
      })
      .map((event) => {
        const eventDate =
          this.parseLocalDate(
            event.date
          );

        const id =
          `event-${event.id}-${event.date}`;

        return {
          id,

          type: 'event' as const,

          title:
            event.title,

          description:
            this.getEventDescription(
              event.date,
              event.time
            ),

          time:
            this.getRelativeEventTime(
              event.date
            ),

          route:
            '/admin/configuracoes',

          icon:
            CalendarDays,

          read:
            this.isRead(id),

          sortDate:
            eventDate,
        };
      });
  }


  // =================================
  // TEMPO DO CADASTRO
  // =================================

  private getRelativeCreatedTime(
    createdAt: Date
  ): string {
    const now =
      new Date();

    const difference =
      now.getTime() -
      createdAt.getTime();

    const minutes =
      Math.floor(
        difference / 60_000
      );

    const hours =
      Math.floor(
        difference / 3_600_000
      );

    const days =
      Math.floor(
        difference / 86_400_000
      );

    if (minutes < 1) {
      return 'Agora';
    }

    if (minutes < 60) {
      return `Há ${minutes} min`;
    }

    if (hours < 24) {
      return hours === 1
        ? 'Há 1 hora'
        : `Há ${hours} horas`;
    }

    if (days === 1) {
      return 'Ontem';
    }

    return `Há ${days} dias`;
  }


  // =================================
  // DESCRIÇÃO DO EVENTO
  // =================================

  private getEventDescription(
    date: string,
    time: string
  ): string {
    const eventDate =
      this.parseLocalDate(date);

    const formattedDate =
      new Intl.DateTimeFormat(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
        }
      ).format(eventDate);

    if (time) {
      return `${formattedDate} • ${time}`;
    }

    return formattedDate;
  }


  // =================================
  // TEMPO ATÉ O EVENTO
  // =================================

  private getRelativeEventTime(
    date: string
  ): string {
    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const eventDate =
      this.parseLocalDate(date);

    const difference =
      Math.round(
        (
          eventDate.getTime() -
          today.getTime()
        ) /
        86_400_000
      );

    if (difference === 0) {
      return 'Hoje';
    }

    if (difference === 1) {
      return 'Amanhã';
    }

    return `Em ${difference} dias`;
  }


  // =================================
  // DATA LOCAL
  // =================================

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


  // =================================
  // VERIFICA SE FOI LIDA
  // =================================

  private isRead(
    id: string
  ): boolean {
    return this.getReadIds()
      .includes(id);
  }


  // =================================
  // RECUPERA IDS LIDOS
  // =================================

  private getReadIds(): string[] {
    try {
      const stored =
        localStorage.getItem(
          this.readStorageKey
        );

      if (!stored) {
        return [];
      }

      const parsed =
        JSON.parse(stored);

      return Array.isArray(parsed)
        ? parsed
        : [];
    } catch {
      return [];
    }
  }


  // =================================
  // SALVA IDS LIDOS
  // =================================

  private saveReadIds(
    ids: string[]
  ): void {
    localStorage.setItem(
      this.readStorageKey,
      JSON.stringify(ids)
    );
  }
}

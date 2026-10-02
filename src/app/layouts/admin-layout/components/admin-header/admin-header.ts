import {
  Component,
  DestroyRef,
  EventEmitter,
  HostListener,
  Output,
  inject,
} from '@angular/core';

import {
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';

import {
  Router,
  RouterLink,
} from '@angular/router';

import {
  Bell,
  ChevronDown,
  CheckCheck,
  LogOut,
  Settings,
  LucideAngularModule,
} from 'lucide-angular';

import {
  AdminNotification,
} from '../../../../core/models/admin-notification.model';

import {
  AdminNotificationService,
} from '../../../../core/services/admin-notification.service';

@Component({
  selector: 'app-admin-header',

  imports: [
    LucideAngularModule,
    RouterLink,
  ],

  templateUrl:
    './admin-header.html',

  styleUrl:
    './admin-header.css',
})
export class AdminHeader {
  private readonly notificationService =
    inject(AdminNotificationService);

  private readonly destroyRef =
    inject(DestroyRef);

  private readonly router =
    inject(Router);

  readonly Bell = Bell;
  readonly ChevronDown = ChevronDown;
  readonly CheckCheck = CheckCheck;
  readonly LogOut = LogOut;
  readonly Settings = Settings;

  @Output()
  menuToggle =
    new EventEmitter<void>();

  protected notificationsOpen =
    false;

  protected userMenuOpen =
    false;

  protected notifications:
    AdminNotification[] = [];

  constructor() {
    this.notificationService
      .notifications$
      .pipe(
        takeUntilDestroyed(
          this.destroyRef
        )
      )
      .subscribe(
        (notifications) => {
          this.notifications =
            notifications;
        }
      );
  }

  protected get unreadCount():
    number {
    return this.notifications
      .filter(
        (notification) =>
          !notification.read
      )
      .length;
  }

  protected toggleMenu():
    void {
    this.menuToggle.emit();
  }

  protected toggleNotifications(
    event: MouseEvent
  ): void {
    event.stopPropagation();

    this.userMenuOpen = false;

    this.notificationsOpen =
      !this.notificationsOpen;
  }

  protected toggleUserMenu(
    event: MouseEvent
  ): void {
    event.stopPropagation();

    this.notificationsOpen = false;

    this.userMenuOpen =
      !this.userMenuOpen;
  }

  protected markAsRead(
    notification:
      AdminNotification
  ): void {
    this.notificationService
      .markAsRead(
        notification.id
      );

    this.notificationsOpen =
      false;
  }

  protected markAllAsRead(
    event: MouseEvent
  ): void {
    event.stopPropagation();

    this.notificationService
      .markAllAsRead();
  }

  protected closeMenus():
    void {
    this.notificationsOpen = false;
    this.userMenuOpen = false;
  }

  protected logout():
    void {
    localStorage.removeItem(
      'church_admin_authenticated'
    );

    this.userMenuOpen = false;

    this.router.navigate([
      '/login',
    ]);
  }

  @HostListener(
    'document:click'
  )
  protected onDocumentClick():
    void {
    this.closeMenus();
  }
}

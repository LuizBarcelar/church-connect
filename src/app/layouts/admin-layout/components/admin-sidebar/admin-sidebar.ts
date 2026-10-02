import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

import {
  ExternalLink,
  Globe2,
  HandHeart,
  HeartHandshake,
  LayoutDashboard,
  LucideAngularModule,
  MessageSquareQuote,
  Settings,
  Users,
} from 'lucide-angular';

@Component({
  selector: 'app-admin-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    LucideAngularModule,
  ],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css',
})
export class AdminSidebar {
  @Input() isOpen = false;

  @Output() menuItemSelected = new EventEmitter<void>();

  readonly LayoutDashboard = LayoutDashboard;
  readonly MessageSquareQuote = MessageSquareQuote;
  readonly Globe2 = Globe2;
  readonly HeartHandshake = HeartHandshake;
  readonly Users = Users;
  readonly HandHeart = HandHeart;
  readonly Settings = Settings;
  readonly ExternalLink = ExternalLink;

  protected closeMenu(): void {
    this.menuItemSelected.emit();
  }
}

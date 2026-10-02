import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AdminSidebar } from './components/admin-sidebar/admin-sidebar';
import { AdminHeader } from './components/admin-header/admin-header';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, AdminSidebar, AdminHeader],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  protected sidebarOpen = false;

  constructor(private readonly router: Router) {}

  protected toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  protected closeSidebar(): void {
    this.sidebarOpen = false;
  }

  protected logout(): void {
    localStorage.removeItem('church_admin_authenticated');

    this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, LucideAngularModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected email = '';
  protected password = '';
  protected submitted = false;
  protected errorMessage = '';
  protected showPassword = false;

  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  constructor(private readonly router: Router) {}

  protected togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  protected submitLogin(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (!this.email.trim() || !this.password.trim()) {
      return;
    }

    const validEmail = 'admin@igreja.com';
    const validPassword = '123456';

    if (
      this.email.trim() === validEmail &&
      this.password === validPassword
    ) {
      localStorage.setItem('church_admin_authenticated', 'true');

      this.router.navigate(['/admin']);
      return;
    }

    this.errorMessage = 'E-mail ou senha incorretos.';
  }
}

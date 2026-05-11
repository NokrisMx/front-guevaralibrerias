import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'login-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './login-page.html',
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  showPass = signal(false);
  isLoading = signal(false);
  errorMsg = signal('');

  onSubmit() {
    if (!this.email() || !this.password()) return;

    this.isLoading.set(true);
    this.errorMsg.set('');

    this.authService.login(this.email(), this.password()).subscribe({
      next: (ok) => {
        this.isLoading.set(false);
        if (ok) {
          this.router.navigateByUrl('/');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMsg.set(err.error?.message ?? 'Correo o contraseña incorrectos.');
        setTimeout(() => {
          this.errorMsg.set('');
        }, 2000);
      },
    });
  }
}

import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

declare const google: any;

@Component({
  selector: 'login-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './login-page.html',
})
export class LoginPage implements AfterViewInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  showPass = signal(false);
  isLoading = signal(false);
  errorMsg = signal('');

  ngAfterViewInit(): void {
    if (typeof google !== 'undefined') {
      this.initGoogle();
    }
  }

  initGoogle() {
    google.accounts.id.initialize({
      client_id: '890397911148-geq3bi7b03l1g0e4dtocns39572j2tv2.apps.googleusercontent.com',
      callback: (response: any) => {
        this.handleGoogle(response.credential);
      },
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'outline',
      size: 'large',
      width: 320,
    });
  }

  handleGoogle(token: string) {
    this.isLoading.set(true);

    this.authService.googleLogin(token).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.isLoading.set(false);
        this.errorMsg.set('Error al iniciar sesión con Google');
      },
    });
  }

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

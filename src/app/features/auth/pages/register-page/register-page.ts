import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'register-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  name = signal<string>('');
  email = signal<string>('');
  password = signal<string>('');
  confirmPass = signal<string>('');
  errorMsg = signal<string>('');
  validationErrors = signal<string[]>([]);

  onSubmit() {
    this.errorMsg.set('');
    this.validationErrors.set([]);

    if (this.password() !== this.confirmPass()) {
      this.validationErrors.set(['Las contraseñas no coinciden.']);
      return;
    }

    const username = this.email().split('@')[0];

    this.authService
      .register({
        username,
        email: this.email(),
        password: this.password(),
        name: this.name(),
        role: 'User',
      })
      .subscribe({
        next: (res) => {
          alert(res.message);

          this.router.navigate(['/auth/login']);
        },

        error: (err) => {
          const response = err.error;

          this.errorMsg.set(response?.message ?? 'Error al registrar usuario');

          // VALIDACIONES
          if (response?.data) {
            const errors: string[] = [];

            Object.values(response.data).forEach((fieldErrors: any) => {
              fieldErrors.forEach((msg: string) => {
                errors.push(msg);
              });
            });

            this.validationErrors.set(errors);
          }
          setTimeout(() => {
            this.errorMsg.set('');
            this.validationErrors.set([]);
          }, 2000);
        },
      });
  }
}

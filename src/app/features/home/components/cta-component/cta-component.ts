import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth-service';

@Component({
  selector: 'cta-component',
  imports: [RouterLink],
  templateUrl: './cta-component.html',
})
export class CtaComponent {
  authService = inject(AuthService);
}

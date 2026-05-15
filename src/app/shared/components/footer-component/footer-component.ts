import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-footer-component',
  imports: [RouterLink],
  templateUrl: './footer-component.html',
})
export class FooterComponent {
  authService = inject(AuthService);
  year = new Date().getFullYear();
}

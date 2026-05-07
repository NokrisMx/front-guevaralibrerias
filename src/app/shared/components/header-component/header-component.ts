import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth-service';

@Component({
  selector: 'app-header-component',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './header-component.html',
})
export class HeaderComponent {
  authService = inject(AuthService);
  cartCount = signal(3);
  mobileOpen = signal(false);
  toggleMobile() {
    this.mobileOpen.update((v) => !v);
  }
}

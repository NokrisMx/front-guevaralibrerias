import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth-service';
import { CartService } from '../../../features/books/services/cart-service';

@Component({
  selector: 'app-header-component',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './header-component.html',
})
export class HeaderComponent {
  authService = inject(AuthService);
  private cartService = inject(CartService);
  cartCount = this.cartService.totalItems;
  mobileOpen = signal(false);
  toggleMobile() {
    this.mobileOpen.update((v) => !v);
  }
}

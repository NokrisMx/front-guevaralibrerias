import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './header-component.html',
})
export class HeaderComponent {
  cartCount = signal(3);
  mobileOpen = signal(false);
  toggleMobile() {
    this.mobileOpen.update((v) => !v);
  }
}

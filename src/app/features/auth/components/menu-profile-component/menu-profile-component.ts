import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'menu-profile-component',
  imports: [RouterLink],
  templateUrl: './menu-profile-component.html',
})
export class MenuProfileComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}

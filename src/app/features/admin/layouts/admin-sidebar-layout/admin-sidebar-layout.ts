import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'admin-sidebar-layout',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar-layout.html',
})
export class AdminSidebarLayout {
  private authService = inject(AuthService);
  private router = inject(Router);
  collapsed = signal(false);

  navItems = [
    { label: 'Dashboard', icon: 'pi-chart-bar', path: '/admin/dashboard', exact: true },
    { label: 'Libros', icon: 'pi-book', path: '/admin/books', exact: true },
    { label: 'Autores', icon: 'pi-user-edit', path: '/admin/authors', exact: true },
    { label: 'Categorías', icon: 'pi-tag', path: '/admin/categories', exact: true },
    { label: 'Editoriales', icon: 'pi-building', path: '/admin/publishers', exact: true },
    { label: 'Ordenes', icon: 'pi-shopping-bag', path: '/admin/orders', exact: true },
    { label: 'Usuarios', icon: 'pi-users', path: '/admin/users', exact: true },
    { label: 'Configuración', icon: 'pi-cog', path: '/admin/settings', exact: true },
  ];

  toggle() {
    this.collapsed.update((v) => !v);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}

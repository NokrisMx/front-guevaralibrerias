import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { BooksAdminPage } from './pages/books-admin-page/books-admin-page';
import { AuthorsAdminPage } from './pages/authors-admin-page/authors-admin-page';
import { CategoriesAdminPage } from './pages/categories-admin-page/categories-admin-page';
import { PublishersAdminPage } from './pages/publishers-admin-page/publishers-admin-page';
import { OrdersAdminPage } from './pages/orders-admin-page/orders-admin-page';
import { UsersAdminPage } from './pages/users-admin-page/users-admin-page';
import { SettingsAdminPage } from './pages/settings-admin-page/settings-admin-page';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayout, // sidebar + router-outlet interno
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard-page/dashboard-page').then((m) => m.DashboardPage),
      },
      {
        path: 'books',
        loadComponent: () =>
          import('./pages/books-admin-page/books-admin-page').then((m) => m.BooksAdminPage),
      },
      {
        path: 'authors',
        loadComponent: () =>
          import('./pages/authors-admin-page/authors-admin-page').then((m) => m.AuthorsAdminPage),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories-admin-page/categories-admin-page').then(
            (m) => m.CategoriesAdminPage,
          ),
      },
      {
        path: 'publishers',
        loadComponent: () =>
          import('./pages/publishers-admin-page/publishers-admin-page').then(
            (m) => m.PublishersAdminPage,
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/orders-admin-page/orders-admin-page').then((m) => m.OrdersAdminPage),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/users-admin-page/users-admin-page').then((m) => m.UsersAdminPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings-admin-page/settings-admin-page').then(
            (m) => m.SettingsAdminPage,
          ),
      },
    ],
  },
];

export default adminRoutes;

import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { FaqsPage } from './features/faqs/pages/faqs-page/faqs-page';
import { adminGuard } from './features/admin/guards/admin-guard';
import { MainLayout } from './shared/layouts/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'faqs',
        component: FaqsPage,
      },
      {
        path: 'books',
        loadChildren: () => import('./features/books/books.routes'),
      },
      {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes'),
      },
    ],
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes'),
    canActivate: [adminGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

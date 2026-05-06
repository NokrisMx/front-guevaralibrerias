import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { FaqsPage } from './features/faqs/pages/faqs-page/faqs-page';

export const routes: Routes = [
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
  {
    path: '**',
    redirectTo: '',
  },
];

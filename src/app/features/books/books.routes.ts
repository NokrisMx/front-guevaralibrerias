import { Routes } from '@angular/router';
import { BooksPage } from './pages/books-page/books-page';
import { BookDetailPage } from './pages/book-detail-page/book-detail-page';
import { CartPage } from './pages/cart-page/cart-page';
import { authGuard } from '../auth/guards/auth-guard';

export const bookRoutes: Routes = [
  {
    path: '',
    component: BooksPage,
  },
  {
    path: 'cart',
    component: CartPage,
    canActivate: [authGuard],
  },
  {
    path: ':id',
    component: BookDetailPage,
  },
];

export default bookRoutes;

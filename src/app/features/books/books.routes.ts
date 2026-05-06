import { Routes } from '@angular/router';
import { BooksPage } from './pages/books-page/books-page';
import { BookDetailPage } from './pages/book-detail-page/book-detail-page';
import { CartPage } from './pages/cart-page/cart-page';

export const bookRoutes: Routes = [
  {
    path: '',
    component: BooksPage,
  },
  {
    path: 'cart',
    component: CartPage,
  },
  {
    path: ':id',
    component: BookDetailPage,
  },
];

export default bookRoutes;

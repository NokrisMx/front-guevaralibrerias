import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { OrdersPage } from './pages/orders-page/orders-page';
import { publicGuard } from './guards/public-guard';
import { authGuard } from './guards/auth-guard';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginPage,
    canActivate: [publicGuard],
  },
  {
    path: 'register',
    component: RegisterPage,
    canActivate: [publicGuard],
  },
  {
    path: 'profile',
    component: ProfilePage,
    canActivate: [authGuard],
  },
  {
    path: 'orders',
    component: OrdersPage,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default authRoutes;

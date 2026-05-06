import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { OrdersPage } from './pages/orders-page/orders-page';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'profile',
    component: ProfilePage,
  },
  {
    path: 'orders',
    component: OrdersPage,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

export default authRoutes;

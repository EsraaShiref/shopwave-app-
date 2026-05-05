import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  // ── Default: redirect to login ────────────────────────────────
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // ── Auth routes (no Header/Footer) ────────────────────────────
  {
    path: 'login',
    loadComponent: () => import('../components/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('../components/signup/signup').then(m => m.SignupComponent)
  },

  // ── App routes (WITH Header/Footer) — protected by authGuard ─
  {
    path: '',
    loadComponent: () => import('../components/layout/layout').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('../components/home/home').then(m => m.Home)
      },
      {
        path: 'products',
        loadComponent: () => import('../components/products/products').then(m => m.Products)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('../components/dashboard/dashboard').then(m => m.DashboardComponent)
      },
    ]
  },

  // ── Error / Not Found (no Header/Footer) ─────────────────────
  {
    path: 'error',
    loadComponent: () => import('../components/error/error').then(m => m.ErrorComponent)
  },
  {
    path: '**',
    loadComponent: () => import('../components/error/error').then(m => m.ErrorComponent)
  },
];

import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard'; 

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/news/news-list/news-list.component')
      .then(c => c.NewsListComponent),
    canActivate: [AuthGuard] 
  },
  {
    path: 'news/:id',
    loadComponent: () => import('./features/news/news-detail/news-detail.component')
      .then(c => c.NewsDetailComponent),
    canActivate: [AuthGuard] 
  },
  {
    path: 'category/:category',
    loadComponent: () => import('./features/news/news-list/news-list.component')
      .then(c => c.NewsListComponent),
    canActivate: [AuthGuard] 
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component')
          .then(c => c.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component')
          .then(c => c.RegisterComponent)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
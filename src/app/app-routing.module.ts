import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
  },
  {
    path: 'movies', loadChildren: () => import('./pages/movies/movies.module').then(m => m.MoviesModule),
  },
  {
    path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

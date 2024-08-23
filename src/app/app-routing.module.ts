import { authGuard } from './guards/auth.guard';
import { authResolver } from './resolvers/auth.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    title: 'TaraGo',
    resolve: {
      isAuth: authResolver
    }
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    resolve: {
      isAuth: authResolver
    }
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'register-proprietorship',
    loadChildren: () => import('./register-proprietorship/register-proprietorship.module').then(m => m.RegisterProprietorshipModule),
    canActivate: [authGuard],
    resolve: {
      isAuth: authResolver
    }
  },
  {
    path: 'help-center',
    loadChildren: () => import('./help-center/help-center.module').then(m => m.HelpCenterModule),
    canActivate: [authGuard],
    resolve: {
      isAuth: authResolver
    }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
  // {
  //   path: '**',

  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

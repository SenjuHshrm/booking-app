import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'staycation-list',
        loadChildren: () => import('./staycation-list/staycation-list.module').then(m => m.StaycationListModule),
        title: 'TaraGo | Staycations'
      },
      {
        path: 'staycation-details',
        loadChildren: () => import('./staycation-details/staycation-details.module').then(m => m.StaycationDetailsModule),
        title: 'TaraGo | Staycation details'
      },
      {
        path: 'book-staycation',
        loadChildren: () => import('./book-staycation/book-staycation.module').then(m => m.BookStaycationModule),
        title: 'TaraGo | Book Staycation'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./customer-dashboard/customer-dashboard.module').then(m => m.CustomerDashboardModule)
      },
      {
        path: '',
        redirectTo: 'staycation-list',
        pathMatch: 'prefix'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

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
        path: 'users-profile',
        loadChildren: () => import('./users-profile/users-profile.module').then(m => m.UsersProfileModule)
      },
      {
        path: 'accounts-settings',
        loadChildren: () => import('./accounts-settings/accounts-settings.module').then(m => m.AccountsSettingsModule)
      },
      {
        path: 'gallery',
        loadChildren: () => import('./gallery-page/gallery-page.module').then(m => m.GalleryPageModule)
      },
      {
        path: 'message',
        loadChildren: () => import('./message-page/message-page.module').then(m => m.MessagePageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('./notification-page/notification-page.module').then(m => m.NotificationPageModule)
      },
      {
        path: 'wishlist',
        loadChildren: () => import('./wish-list/wish-list.module').then(m => m.WishListModule)
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

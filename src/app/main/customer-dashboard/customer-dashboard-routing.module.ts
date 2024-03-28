import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerDashboardComponent,
    children: [
      {
        path: 'today',
        loadChildren: () => import('./today/today.module').then(m => m.TodayModule),
        title: 'TaraGo | Today'
      },
      {
        path: 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule),
        title: 'TaraGo | Calendar'
      },
      {
        path: 'listing',
        loadChildren: () => import('./listing/listing.module').then(m => m.ListingModule),
        title: 'TaraGo | Listing'
      },
      {
        path: 'inbox',
        loadChildren: () => import('./inbox/inbox.module').then(m => m.InboxModule),
        title: 'TaraGo | Inbox'
      },
      {
        path: '',
        redirectTo: 'today',
        pathMatch: 'prefix'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDashboardRoutingModule { }

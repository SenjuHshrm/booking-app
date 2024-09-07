import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YourTripsComponent } from './your-trips.component';

const routes: Routes = [
  {
    path: '',
    component: YourTripsComponent,
    children: [
      {
        path: 'pending-trip',
        loadChildren: () => import('./pending-trip/pending-trip.module').then(m => m.PendingTripModule),
        title: 'TaraGo | Pending-Trip'
      },
      {
        path: 'upcoming-trip',
        loadChildren: () => import('./upcoming-trip/upcoming-trip.module').then(m => m.UpcomingTripModule),
        title: 'TaraGo | Upcoming-Trip'
      },
      {
        path: 'in-progress-trip',
        loadChildren: () => import('./in-progress-trip/in-progress-trip.module').then(m => m.InProgressTripModule),
        title: 'TaraGo | In-Progress-Trip'
      },
      {
        path: 'completed-trip',
        loadChildren: () => import('./completed-trip/completed-trip.module').then(m => m.CompletedTripModule),
        title: 'TaraGo | Completed-Trip'
      },
      {
        path: 'cancelled-trip',
        loadChildren: () => import('./cancelled-trip/cancelled-trip.module').then(m => m.CancelledTripModule),
        title: 'TaraGo | Cancelled-Trip'
      },
      {
        path: '',
        redirectTo: 'pending-trip',
        pathMatch: 'prefix'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YourTripsRoutingModule { }

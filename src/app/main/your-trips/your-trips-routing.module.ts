import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YourTripsComponent } from './your-trips.component';

const routes: Routes = [
  {path:'',component:YourTripsComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YourTripsRoutingModule { }

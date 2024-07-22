import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckingOutComponent } from './checking-out/checking-out.component';
import { ArrivingSoonComponent } from './arriving-soon/arriving-soon.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CurrentlyGuestComponent } from './currently-guest/currently-guest.component';
import { TimeFormatPipe } from './time-format.pipe';
import { PluralizePipe } from './pluralize-interval.pipe';
import { ReviewsComponent } from './reviews/reviews.component';


@NgModule({
  declarations: [
    ArrivingSoonComponent,
    UpcomingComponent,
    CurrentlyGuestComponent,
    CheckingOutComponent,
    TimeFormatPipe,
    PluralizePipe,
    ReviewsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule
  ],

  exports:[
    CheckingOutComponent,
    ArrivingSoonComponent,
    UpcomingComponent,
    CurrentlyGuestComponent,
    ReviewsComponent
  ]
})
export class ComponentsModule { }

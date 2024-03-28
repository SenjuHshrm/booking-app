import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckingOutComponent } from './checking-out/checking-out.component';
import { CurrentlyProprietorComponent } from './currently-proprietor/currently-proprietor.component';
import { ArrivingSoonComponent } from './arriving-soon/arriving-soon.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { PendingReviewComponent } from './pending-review/pending-review.component';



@NgModule({
  declarations: [
    CheckingOutComponent,
    CurrentlyProprietorComponent,
    ArrivingSoonComponent,
    UpcomingComponent,
    PendingReviewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }

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
import { CancelledBookingComponent } from './cancelled-booking/cancelled-booking.component';
import { PendingReviewComponent } from './pending-review/pending-review.component';
import { ForApprovalComponent } from './for-approval/for-approval.component';
import { ValidationModalComponent } from './modal/validation-modal/validation-modal.component';
import { MessageGuestModalComponent } from './modal/message-guest-modal/message-guest-modal.component';
import { GlobalsModule } from 'src/app/globals/globals.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TripMessageHostComponent } from './modal/trip-message-host/trip-message-host.component';

@NgModule({
  declarations: [
    ArrivingSoonComponent,
    UpcomingComponent,
    CurrentlyGuestComponent,
    CheckingOutComponent,
    TimeFormatPipe,
    PluralizePipe,
    CancelledBookingComponent,
    PendingReviewComponent,
    ForApprovalComponent,
    ValidationModalComponent,
    MessageGuestModalComponent,
    TripMessageHostComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    GlobalsModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],

  exports: [
    CheckingOutComponent,
    ArrivingSoonComponent,
    UpcomingComponent,
    CurrentlyGuestComponent,
    CancelledBookingComponent,
    PendingReviewComponent,
    ForApprovalComponent,
  ],
})
export class ComponentsModule {}

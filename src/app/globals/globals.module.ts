import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { ProfileComponent } from './profile/profile.component';
import {
  GoogleSigninButtonDirective,
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';
import { BookingTermsComponent } from './booking-terms/booking-terms.component';
import { LoaderStateComponent } from './loader-state/loader-state.component';
import { GalleryViewComponent } from './gallery/gallery-view/gallery-view.component';
import { MessageProprietorComponent } from './message-proprietor/message-proprietor.component';
import { WheretoSleepViewComponent } from './whereto-sleep-view/whereto-sleep-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { CancelPolicyLearnmoreComponent } from './cancel-policy-learnmore/cancel-policy-learnmore.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeImageGalleryComponent } from './home-image-gallery/home-image-gallery.component';
import { InputErrorMessageComponent } from './input-error-message/input-error-message.component';
import { ViewProfileModalComponent } from './modals/view-profile-modal/view-profile-modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaskCardPipe } from './pipes/mask-card.pipe';
import { ViewGuestCheckoutModalComponent } from './modals/view-guest-checkout-modal/view-guest-checkout-modal.component';
import { ViewReservationModalComponent } from './modals/view-reservation-modal/view-reservation-modal.component';
import { ViewGuestListModalComponent } from './modals/view-guest-list-modal/view-guest-list-modal.component';
import { ViewCheckinModalComponent } from './modals/view-checkin-modal/view-checkin-modal.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { AddGuestComponent } from './modals/view-guest-list-modal/add-guest/add-guest.component';
import { MatButtonModule } from '@angular/material/button';
import { ViewtripsReservationModalComponent } from './modals/viewtrips-reservation-modal/viewtrips-reservation-modal.component';
import { SwiperModule } from 'swiper/angular';
import { ValidationTripsModalComponent } from '../main/your-trips/modal/validation-trips-modal/validation-trips-modal.component';

@NgModule({
  declarations: [
    ProfileComponent,
    CreateListingComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CreateListingComponent,
    BookingTermsComponent,
    LoaderStateComponent,
    GalleryViewComponent,
    MessageProprietorComponent,
    WheretoSleepViewComponent,
    UsersProfileComponent,
    CancelPolicyLearnmoreComponent,
    ForgotPasswordComponent,
    HomeImageGalleryComponent,
    InputErrorMessageComponent,
    ViewProfileModalComponent,
    ViewGuestCheckoutModalComponent,
    MaskCardPipe,
    ViewReservationModalComponent,
    ViewGuestListModalComponent,
    ViewCheckinModalComponent,
    ConfirmationComponent,
    AddGuestComponent,
    ViewtripsReservationModalComponent,
    ValidationTripsModalComponent,
  ],

  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleSigninButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatProgressBarModule,
    MatButtonModule,
    SwiperModule
  ],

  providers: [GoogleSigninButtonDirective],

  exports: [
    ProfileComponent,
    CreateListingComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CreateListingComponent,
    MessageProprietorComponent,
    WheretoSleepViewComponent,
    UsersProfileComponent,
    HomeImageGalleryComponent,
    InputErrorMessageComponent,
    MaskCardPipe,
    ViewReservationModalComponent,
    ViewGuestListModalComponent,
    ViewCheckinModalComponent,
    ViewtripsReservationModalComponent
  ],
})
export class GlobalsModule {}

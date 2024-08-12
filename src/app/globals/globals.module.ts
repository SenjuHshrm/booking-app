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
import { GoogleSigninButtonDirective, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { LearnMoreComponent } from './learn-more/learn-more.component';
import { BookingTermsComponent } from './booking-terms/booking-terms.component';
import { ReservationsViewComponent } from './reservations-view/reservations-view.component';
import { LoaderStateComponent } from './loader-state/loader-state.component';
import { GalleryViewComponent } from './gallery/gallery-view/gallery-view.component';
import { MessageProprietorComponent } from './message-proprietor/message-proprietor.component';
import { WheretoSleepViewComponent } from './whereto-sleep-view/whereto-sleep-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UsersProfileComponent } from './users-profile/users-profile.component';



@NgModule({
  declarations: [
    ProfileComponent,
    CreateListingComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CreateListingComponent,
    LearnMoreComponent,
    BookingTermsComponent,
    ReservationsViewComponent,
    LoaderStateComponent,
    GalleryViewComponent,
    MessageProprietorComponent,
    WheretoSleepViewComponent,
    UsersProfileComponent
  ],

  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleSigninButtonModule,
    MatDialogModule
  ],

  providers: [
    GoogleSigninButtonDirective
  ],

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
    UsersProfileComponent
  ]


})
export class GlobalsModule { }

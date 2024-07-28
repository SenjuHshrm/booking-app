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
  ],

  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleSigninButtonModule
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
    CreateListingComponent
  ]


})
export class GlobalsModule { }

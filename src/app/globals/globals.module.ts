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
import { MyFavoriteComponent } from './my-favorite/my-favorite.component';


@NgModule({
  declarations: [
    ProfileComponent,
    MyFavoriteComponent,
    CreateListingComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CreateListingComponent
  ],

  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule
  ],


  exports: [
    ProfileComponent,
    CreateListingComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent
  ]


})
export class GlobalsModule { }

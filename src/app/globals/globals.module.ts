import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SearchFiltersComponent } from './search-filters/search-filters.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    GalleryComponent,
    SearchFiltersComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GlobalsModule { }

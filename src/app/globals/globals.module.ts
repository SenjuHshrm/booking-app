import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SearchFiltersComponent } from './search-filters/search-filters.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    GalleryComponent,
    SearchFiltersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GlobalsModule { }

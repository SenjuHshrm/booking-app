import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './globals/footer/footer.component';
import { NavComponent } from './globals/nav/nav.component';
import { LoginComponent } from './globals/login/login.component';
import { SignupComponent } from './globals/signup/signup.component';

export class CustomErrorHandler implements ErrorHandler {
  handleError(error: any) {
    // Custom error handling logic
  }
}

@NgModule({


  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent
  ],

  imports: [
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    SwiperModule,
    MatCardModule,
    MatRadioModule,
    FormsModule,
    MatExpansionModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    { provide: ErrorHandler, useClass: CustomErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

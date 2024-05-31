import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MainModule } from './main/main.module';
import { HomeModule } from './home/home.module';

export class CustomErrorHandler implements ErrorHandler {
  handleError(error: any) {
    // Custom error handling logic
  }
}

@NgModule({


  declarations: [
    AppComponent
  ],

  imports: [
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MainModule,
    HomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    // { provide: ErrorHandler, useClass: CustomErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

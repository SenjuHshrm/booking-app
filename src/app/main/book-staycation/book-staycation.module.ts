import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookStaycationRoutingModule } from './book-staycation-routing.module';
import { BookStaycationComponent } from './book-staycation.component';


@NgModule({
  declarations: [
    BookStaycationComponent
  ],
  imports: [
    CommonModule,
    BookStaycationRoutingModule
  ]
})
export class BookStaycationModule { }

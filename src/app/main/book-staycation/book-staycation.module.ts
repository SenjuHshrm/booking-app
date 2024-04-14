import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookStaycationRoutingModule } from './book-staycation-routing.module';
import { BookStaycationComponent } from './book-staycation.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    BookStaycationComponent
  ],
  imports: [
    CommonModule,
    BookStaycationRoutingModule,
    MatIconModule
  ]
})
export class BookStaycationModule { }

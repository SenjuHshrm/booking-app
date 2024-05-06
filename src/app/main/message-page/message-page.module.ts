import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagePageRoutingModule } from './message-page-routing.module';
import { MessagePageComponent } from './message-page.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    MessagePageComponent
  ],
  imports: [
    CommonModule,
    MessagePageRoutingModule,
    MatIconModule
  ]
})
export class MessagePageModule { }

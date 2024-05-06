import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationPageRoutingModule } from './notification-page-routing.module';
import { NotificationPageComponent } from './notification-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [NotificationPageComponent],
  imports: [
    CommonModule,
    NotificationPageRoutingModule,
    MatCardModule,
    MatIconModule
  ]
})
export class NotificationPageModule { }

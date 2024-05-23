import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersControlRoutingModule } from './users-control-routing.module';
import { UsersControlComponent } from './users-control.component';




@NgModule({
  declarations: [
    UsersControlComponent,
  ],
  imports: [
    CommonModule,
    UsersControlRoutingModule
  ]
})
export class UsersControlModule { }

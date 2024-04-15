import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersProfileRoutingModule } from './users-profile-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { UsersProfileComponent } from './users-profile.component';
import { CreateProfileModalComponent } from './component/create-profile-modal/create-profile-modal.component';


@NgModule({
  declarations: [
    UsersProfileComponent,
    CreateProfileModalComponent
  ],
  imports: [
    CommonModule,
    UsersProfileRoutingModule,
    MatIconModule
  ]
})
export class UsersProfileModule { }

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersProfileRoutingModule } from './users-profile-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { UsersProfileComponent } from './users-profile.component';
import { CreateProfileModalComponent } from './component/create-profile-modal/create-profile-modal.component';
import { GlobalsModule } from '../../globals/globals.module';

@NgModule({
  declarations: [UsersProfileComponent, CreateProfileModalComponent],
  imports: [
    CommonModule,
    UsersProfileRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    GlobalsModule,
  ],
})
export class UsersProfileModule {}

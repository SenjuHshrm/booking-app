import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CreateProfileModalComponent } from './create-profile-modal.component';



@NgModule({
  declarations: [
    CreateProfileModalComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class CreateProfileModalModule { }

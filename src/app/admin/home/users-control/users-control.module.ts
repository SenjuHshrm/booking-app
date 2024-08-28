import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersControlRoutingModule } from './users-control-routing.module';
import { UsersControlComponent } from './users-control.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ValidationModalComponent } from './validation-modal/validation-modal.component';





@NgModule({
  declarations: [
    UsersControlComponent,
    ValidationModalComponent,
  ],
  imports: [
    CommonModule,
    UsersControlRoutingModule,
    MatSelectModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  
  ]
})
export class UsersControlModule { }

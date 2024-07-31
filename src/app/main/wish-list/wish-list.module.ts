import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishListRoutingModule } from './wish-list-routing.module';
import { WishListComponent } from './wish-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [WishListComponent],
  imports: [
    CommonModule,
    WishListRoutingModule,
    MatIconModule,
    FormsModule
  ]
})
export class WishListModule { }

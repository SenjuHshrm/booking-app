import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { TaxComponent } from './tax/tax.component';
import { HostEarningComponent } from './host-earning/host-earning.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ImgCarouselComponent } from './img-carousel/img-carousel.component';


@NgModule({
  declarations: [
    SettingsComponent,
    TaxComponent,
    HostEarningComponent,
    FaqsComponent,
    ImgCarouselComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule
  ]
})
export class SettingsModule { }

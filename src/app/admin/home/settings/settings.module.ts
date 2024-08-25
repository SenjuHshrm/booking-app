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
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CreateFaqModalComponent } from './faqs/create-faq-modal/create-faq-modal.component';
import { UpdateFaqModalComponent } from './faqs/update-faq-modal/update-faq-modal.component';
import { DeleteFaqModalComponent } from './faqs/delete-faq-modal/delete-faq-modal.component';
import { ViewFaqModalComponent } from './faqs/view-faq-modal/view-faq-modal.component';
import { VisibleFaqModalComponent } from './faqs/visible-faq-modal/visible-faq-modal.component';
import { GlobalsModule } from '../../../globals/globals.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    SettingsComponent,
    TaxComponent,
    HostEarningComponent,
    FaqsComponent,
    ImgCarouselComponent,
    CreateFaqModalComponent,
    UpdateFaqModalComponent,
    DeleteFaqModalComponent,
    ViewFaqModalComponent,
    VisibleFaqModalComponent,
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
    MatSnackBarModule,
    MatMenuModule,
    MatPaginatorModule,
    GlobalsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
})
export class SettingsModule {}

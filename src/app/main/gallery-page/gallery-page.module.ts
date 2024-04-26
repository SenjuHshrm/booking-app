import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryPageRoutingModule } from './gallery-page-routing.module';
import { GalleryPageComponent } from './gallery-page.component';
import { GalleryComponent } from 'src/app/globals/gallery/gallery.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    GalleryPageComponent,
    GalleryComponent
  ],
  imports: [
    CommonModule,
    GalleryPageRoutingModule,
    MatIconModule
  ]
})
export class GalleryPageModule { }

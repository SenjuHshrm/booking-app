import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryPageComponent } from './gallery-page.component';

const routes: Routes = [{ path: ':id', component: GalleryPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryPageRoutingModule { }

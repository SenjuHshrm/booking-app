import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookStaycationComponent } from './book-staycation.component';

const routes: Routes = [{ path: '', component: BookStaycationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookStaycationRoutingModule { }

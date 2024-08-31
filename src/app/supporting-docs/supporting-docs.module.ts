import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportingDocsRoutingModule } from './supporting-docs-routing.module';
import { SupportingDocsComponent } from './supporting-docs.component';


@NgModule({
  declarations: [
    SupportingDocsComponent
  ],
  imports: [
    CommonModule,
    SupportingDocsRoutingModule
  ]
})
export class SupportingDocsModule { }

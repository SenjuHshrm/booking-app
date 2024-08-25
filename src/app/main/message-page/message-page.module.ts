import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagePageRoutingModule } from './message-page-routing.module';
import { MessagePageComponent } from './message-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MessageSidenavComponent } from './message-sidenav/message-sidenav.component';
import { MessageContentComponent } from './message-content/message-content.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MessagePageComponent,
    MessageSidenavComponent,
    MessageContentComponent,
    MessageFormComponent,
  ],
  imports: [
    CommonModule,
    MessagePageRoutingModule,
    MatIconModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MessagePageModule {}

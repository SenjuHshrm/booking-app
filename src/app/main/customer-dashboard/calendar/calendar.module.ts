import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarcomModule } from './components/calendarcom.module';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FullCalendarModule,
    CalendarcomModule,
    MatTabsModule
  ]
})
export class CalendarModule { }

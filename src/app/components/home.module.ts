import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CalendarService } from '../services/calendar.service';
import { CalendarModule } from '../shared/calendar/calendar.module';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CalendarModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    CalendarService
  ]
})
export class HomeModule { }

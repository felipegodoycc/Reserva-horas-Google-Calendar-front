import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking
import { formatDate } from '@fullcalendar/angular';
import { CalendarEvent } from 'src/app/interfaces/event.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() events:CalendarEvent[] = [];
  @Output() today: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedDay: EventEmitter<string> = new EventEmitter<string>();

  // references the #calendar in the template
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;


  calendarApi!:Calendar;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: this.events,
    height: "500px",
    aspectRatio: 100,
    validRange: {
      start: new Date()
    },
    showNonCurrentDates: false,
    firstDay: 1,
    datesSet: this.detectDateSet
  };

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.calendarApi = this.calendarComponent.getApi();
    this.today.emit(this.calendarApi.getDate().toISOString());
    console.log("Dia actual calendario: ", this.calendarApi.getDate())
  }

  detectDateSet(args: any ){
    console.log("Cambio detectado: ", args)
  }

  handleDateClick(args:any){
    const dateSelected = formatDate(args.date, { month: 'numeric', year: 'numeric', day: 'numeric', locale: 'cl' });
    this.selectedDay.emit(dateSelected);
  }

}

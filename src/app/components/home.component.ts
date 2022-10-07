import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { CalendarService } from 'src/app/services/calendar.service';
import { CalendarDay, CalendarQueryData, CalendarTimeSlot } from '../interfaces/calendarApi.interface';
import { CalendarEvent } from '../interfaces/event.interface';
import { getObjectDate, getObjectTime } from '../utils/date-utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;

  public selectedMonth: string = "10";
  public selectedYear: string = "2022";
  public dayEvents: CalendarEvent[] = []
  public monthData: CalendarDay[] = [];
  public timeSlotSelectedDay: CalendarTimeSlot[] = [];
  public showSpinner: boolean = false;
  public message: string = 'Selecciona un dia en el calendario para ver disponibilidad';

  public selectedDate: string = '';
  public selectedTimeSlot: CalendarTimeSlot = { startTime: "", endTime: "" };
  public personalData: any;
  public firstStepError : boolean = false;

  reserveDataForm = this._formBuilder.group({
    date: ['', Validators.required],
    timeslot: ['', Validators.required]
  })

  datosPersonaForm = this._formBuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required]
  })

  constructor(private _formBuilder: FormBuilder,
              private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.getMonthData();
  }

  getToday($event: string){
    console.log("Hoy es: ", $event)
  }

  getMonthData(){
    const dateData: CalendarQueryData = {
      month: this.selectedMonth,
      year: this.selectedYear
    }
    this.calendarService.getDays(dateData).subscribe( res => {
      this.monthData = res.days;
    })
  }

  get formControls(){
    return this.datosPersonaForm.controls
  }

  get reserveDataControls(){
    return this.reserveDataForm.controls
  }

  public onSelectedDay($event:any){
    console.log("Ha sido seleccionado el dia: ", $event);
    this.selectedDate = $event;
    this.reserveDataControls['date'].setValue($event)
    this.loadSlots(this.selectedDate);
  }

  loadSlots(data:any){
    this.timeSlotSelectedDay = [];
    this.showSpinner = true;
    const dateData: CalendarQueryData = getObjectDate(data);
    console.log("Solicitando slots : ", dateData);
    this.calendarService.getSlotTimes(dateData).subscribe( res => {
      console.log("Respuesta timeslot: ", res)
      if(res.success){
        this.timeSlotSelectedDay = res.timeslots;
      } else {
        this.message = "No hay reservas disponibles o el servicio no se encuenta disponible, seleccione otro dia."
      }
      this.showSpinner = false;
    })
  }


  public preReserva(timeSlot: CalendarTimeSlot){
    this.selectedTimeSlot = timeSlot;
    this.reserveDataControls['timeslot'].setValue(timeSlot);
    console.log("Timeslot seleccionado: ", timeSlot);
    const dateData: CalendarQueryData = getObjectDate(this.selectedDate);
    const timeData = getObjectTime(timeSlot.startTime);
    const data = Object.assign(dateData, timeData);
    this.myStepper.next();
  }

  public confirmacion(){
    if(this.datosPersonaForm.valid){
      this.personalData = this.datosPersonaForm.getRawValue();
      console.log("datos persona: ", this.personalData);
      this.myStepper.next();
    }
  }

  public reservar(){
    const dateData: CalendarQueryData = getObjectDate(this.selectedDate);
    const timeData = getObjectTime(this.selectedTimeSlot.startTime);
    const data = Object.assign(dateData, timeData);
    this.calendarService.reserveSlot(data).subscribe( res => {
      console.log("Respuesta reservar: ", res)
      this.myStepper.reset();
    })
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CalendarDaysApiResponse, CalendarQueryData, CalendarTimeslotsApiResponse } from '../interfaces/calendarApi.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private urlServer:string;

  constructor(private httpClient: HttpClient) {
    this.urlServer = environment.bff_url;
  }

  getDays(data: CalendarQueryData): Observable<CalendarDaysApiResponse>{
    const uri = `${this.urlServer}/days?month=${data.month}&year=${data.year}`;
    return this.httpClient.get<CalendarDaysApiResponse>(uri);
  }

  getSlotTimes(data: CalendarQueryData){
    const uri = `${this.urlServer}/timeslots?year=${data.year}&month=${data.month}&day=${data.day}`;
    return this.httpClient.get<CalendarTimeslotsApiResponse>(uri);
  }

  reserveSlot(data: CalendarQueryData){
    const uri = `${this.urlServer}/book?year=${data.year}&month=${data.month}&day=${data.day}&hour=${data.hour}&minute=${data.minutes}`;
    const body = {};
    return this.httpClient.post(uri, body);
  }
}

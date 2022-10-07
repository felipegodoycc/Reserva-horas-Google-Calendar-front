export interface CalendarQueryData {
  day?: string,
  month: string,
  year: string,
  hour?: string,
  minutes?:string
}

export interface CalendarDay {
  day: number,
  hasTimeSlots: boolean
}

export interface CalendarTimeSlot {
  startTime: string,
  endTime: string,
  available?: boolean
}

export interface CalendarDaysApiResponse{
  success: boolean,
  days: CalendarDay[]
}

export interface CalendarTimeslotsApiResponse{
  success: boolean,
  timeslots: CalendarTimeSlot[]
}

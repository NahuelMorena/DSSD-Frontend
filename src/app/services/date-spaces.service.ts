import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DateSpace } from '../interfaces/date-space';
import { DateDto } from '../modelos/date-dto';

@Injectable({
  providedIn: 'root'
})
export class DateSpacesService {

  constructor(private http: HttpClient) { }

  private url='http://localhost:8080/api/collections'

  public getDateSpaces():Observable<DateSpace[]>{
    return this.http.get<DateSpace[]>(this.url + "/get-dateSpaces",{withCredentials:true})
  }

  public getDateSpacesByDates(date:DateDto):Observable<DateSpace[]>{
    return this.http.post<DateSpace[]>(this.url + "/get-dateSpaces-filter-by-dates",date,{withCredentials: true})
  }
}

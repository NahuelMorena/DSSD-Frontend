import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DateSpace } from '../interfaces/date-space';

@Injectable({
  providedIn: 'root'
})
export class DateSpacesService {

  constructor(private http: HttpClient) { }

  private url='http://localhost:8080/api/collections'

  public getDateSpaces():Observable<DateSpace[]>{
    return this.http.get<DateSpace[]>(this.url + "/get-dateSpaces",{withCredentials:true})
  }
}

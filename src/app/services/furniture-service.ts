import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Furniture } from "../modelos/furniture";

@Injectable()
export class FurnitureService {
    private url='http://localhost:8080/api/furnitures'
    constructor(private http: HttpClient) {}
    
      public getFurnitures():Observable<Furniture[]> {
        return this.http.get<Furniture[]>(this.url+"/get-furnitures",{withCredentials:true});
      }
    }
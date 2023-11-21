import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { LoginRequest } from "../modelos/requestDto/login-request";

@Injectable()
export class UserService{
    constructor(private http: HttpClient) {}

    private url='http://localhost:8080/api/users'
    private rolSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
    public rol$:Observable<string>=this.rolSubject.asObservable();
    
      public getRolFromServer():Observable<string>{
        return this.http.get<string>(this.url+"/getRolSession",{withCredentials:true,responseType: 'text' as "json"});
      }

      public setRol(rol:string):void{
        this.rolSubject.next(rol);
      }

      public getRol():Observable<string>{
        return this.rolSubject.asObservable();
      }
    }
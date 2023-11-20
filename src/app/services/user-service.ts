import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginRequest } from "../modelos/requestDto/login-request";

@Injectable()
export class UserService{
    constructor(private http: HttpClient) {}

    private url='http://localhost:8080/api/users'
    
      public getRol():Observable<string>{
        return this.http.get<string>(this.url+"/getRolSession",{withCredentials:true,responseType: 'text' as "json"});

      }
    }
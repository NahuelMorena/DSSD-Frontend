import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { LoginRequest } from "../modelos/requestDto/login-request";
import { Router } from "@angular/router";

@Injectable()
export class AuthService{

    private estaLogeado=false;
    private readonly STORAGE_KEY = 'isLoggedIn';

    constructor(private http: HttpClient,private router: Router) {
        this.estaLogeado = this.obtenerEstadoPersistido();
    }
    
      public login(lr:LoginRequest):Observable<String>{
        return this.http.post<String>("http://localhost:8080/login",lr,{withCredentials:true,responseType: 'text' as "json"}).pipe(
            tap(response => {
              this.guardarEstadoPersistido(true)})
          );

      }

      public logout():Observable<any>{
        return this.http.get<any>("http://localhost:8080/logout",{withCredentials:true,responseType: 'text' as "json"}).pipe(
          tap(response=> {
            this.borrarEstadoPersistido()
          })
        )
      }

      public isLogeado(): boolean {
        return this.estaLogeado;
      }

      private obtenerEstadoPersistido(): boolean {
        const isLoggedIn = localStorage.getItem(this.STORAGE_KEY);
        return isLoggedIn ? JSON.parse(isLoggedIn) : false;
      }
      private guardarEstadoPersistido(isLoggedIn: boolean): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(isLoggedIn));
        this.estaLogeado = isLoggedIn;
      }

      public borrarEstadoPersistido(): void {
        localStorage.removeItem(this.STORAGE_KEY);
        this.estaLogeado = false;
      }

      canActivate():Observable<boolean>{
        return new Observable<boolean>(observer=> {
            if(this.isLogeado()){
                observer.next(true)
            }else{
                this.router.navigate(["/login"]);
                observer.next(false)
            }
            observer.complete()
        })
      }
    }
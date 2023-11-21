import { Component } from '@angular/core';
import { UserService } from '../services/user-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private userService:UserService,private route:Router,private authService:AuthService){
    this.getRol()
  }

  rol=""
  getRol(){
    this.userService.getRol().subscribe(
      (response)=>{
        this.rol=response;
        if(this.rol===""){
          this.userService.getRolFromServer().subscribe(
            (response)=>{
              this.rol=response;
              this.userService.setRol(this.rol);
            },
            (error:HttpErrorResponse)=>{
              if(error.status==401){
                this.authService.borrarEstadoPersistido();
                this.route.navigate(["/"])
              }
            }
          )
        }
        if(this.rol=="CREATIVE"){
          this.route.navigate(["/crearColeccion"])
        }
      }
    )
  }
}

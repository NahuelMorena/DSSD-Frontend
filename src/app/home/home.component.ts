import { Component } from '@angular/core';
import { UserService } from '../services/user-service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth-service';

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
      },
      (error:HttpErrorResponse)=>{
        if(error.status==401){
          this.authService.borrarEstadoPersistido()
          this.route.navigate(["/"])
        }
      }
    )
  }
}

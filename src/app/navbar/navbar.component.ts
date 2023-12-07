import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { GoogleDriveService } from '../services/drive-service';
import { TokenService } from '../services/token-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  rol:string="";

  constructor(private route:Router,private userService:UserService,private authService:AuthService,private driveService:GoogleDriveService,private tokenService:TokenService){
    this.getRol()
  }

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
      }
    )
  }

  logout(){
    this.authService.logout().subscribe(
      (response) => {
        if(this.rol=="CREATIVE"){
          this.driveService.logout().subscribe(
            (response)=>{
              this.tokenService.clearToken();
            }
          )
        }
        this.route.navigate(["/login"])
      },
      (error:HttpErrorResponse)=>{
        if(error.status==401){
          this.route.navigate(["/login"])
        }
      }
    )
  }
}

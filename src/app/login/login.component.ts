import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BonitaService } from '../services/bonita-service';
import { LoginRequest } from '../modelos/requestDto/login-request';
import { AuthService } from '../services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  lr:LoginRequest=new LoginRequest("","");
  submitted=false;
  constructor(private router: Router,private authService:AuthService,private userService:UserService){
   }
   

   onSubmit(formulario: NgForm) {
    if(formulario.valid){
      this.loginUsuario();
    }
  }

  loginUsuario(): void {
    this.authService.login(this.lr).subscribe(
      (response)=>{
        this.userService.getRolFromServer().subscribe(
          (response)=>{
            this.userService.setRol(response);
          }
        )
        this.router.navigate(["/"])
      },
      (error:HttpErrorResponse)=>{
        if(error.status==401){
          window.alert(error.error)
        }
      }
    )
  }
}

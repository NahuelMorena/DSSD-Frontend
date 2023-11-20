import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BonitaService } from '../services/bonita-service';
import { LoginRequest } from '../modelos/requestDto/login-request';
import { AuthService } from '../services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  lr:LoginRequest=new LoginRequest("","");
  submitted=false;
  constructor(private router: Router,private authService:AuthService){
   }
   

   onSubmit(formulario: NgForm) {
    if(formulario.valid){
      this.loginUsuario();
    }
  }

  loginUsuario(): void {
    this.authService.login(this.lr).subscribe(
      (response)=>{
        this.router.navigate(["/"])
      },
      (error:HttpErrorResponse)=>{
        window.alert(error.error)
        console.log(error)
      }
    )
  }
}

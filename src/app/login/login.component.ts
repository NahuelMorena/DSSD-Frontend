import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../modelos/requestDto/login-request';
import { AuthService } from '../services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../services/user-service';
import { TokenService } from '../services/token-service';
import { GoogleDriveService } from '../services/drive-service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  lr:LoginRequest=new LoginRequest("","");
  submitted=false;
  constructor(private router: Router,private authService:AuthService,private userService:UserService,private tokenService:TokenService,private driveService:GoogleDriveService){
   }
   

   onSubmit(formulario: NgForm) {
    if(formulario.valid){
      this.loginUsuario();
    }
  }

  loginUsuario(): void {
    this.authService.login(this.lr).pipe(
      switchMap(() => this.userService.getRolFromServer())
    ).subscribe(
      (rol: string) => {
        this.userService.setRol(rol);
  
        if (rol === "CREATIVE") {
          this.loginDrive();
        } else {
          this.router.navigate(["/"]);
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          window.alert(error.error);
        }
      }
    );
  }

  loginDrive(){
    if(this.tokenService.getToken() == null){
      this.driveService.authenticate();
    }
  }
  
}

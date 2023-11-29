import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { DateSpacesService } from '../services/date-spaces.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DateSpace } from '../interfaces/date-space';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reserve-space',
  templateUrl: './reserve-space.component.html',
  styleUrls: ['./reserve-space.component.css']
})
export class ReserveSpaceComponent {
toggleSelection(_t15: DateSpace) {
throw new Error('Method not implemented.');
}
onSubmit(_t10: NgForm) {
throw new Error('Method not implemented.');
}
  dateSpaces: DateSpace[] = [];

  constructor(private dateSpaceService:DateSpacesService,private router: Router,private authService:AuthService){
    this.getDateSpaces()
  }
  getDateSpaces() {
    this.dateSpaceService.getDateSpaces().subscribe(
      (espacios)=>{
        this.dateSpaces=espacios;
      }
      ,(error:HttpErrorResponse)=>{
        if(error.status==401){
          this.authService.borrarEstadoPersistido();
          this.router.navigate(["/login"])
        }
        else if(error.status==403){
          this.router.navigate(["/"])
        }
      }
    );
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { DateSpacesService } from '../services/date-spaces.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DateSpace } from '../interfaces/date-space';

@Component({
  selector: 'app-reserve-space',
  templateUrl: './reserve-space.component.html',
  styleUrls: ['./reserve-space.component.css']
})
export class ReserveSpaceComponent {
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

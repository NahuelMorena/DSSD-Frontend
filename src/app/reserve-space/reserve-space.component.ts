import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { DateSpacesService } from '../services/date-spaces.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DateSpace } from '../interfaces/date-space';
import { NgForm } from '@angular/forms';
import { DateSpaceRequestDto } from '../modelos/dateSpace-request-dto';
import { CollectionService } from '../services/collection-service';

@Component({
  selector: 'app-reserve-space',
  templateUrl: './reserve-space.component.html',
  styleUrls: ['./reserve-space.component.css']
})
export class ReserveSpaceComponent {

  constructor(private dateSpaceService:DateSpacesService,private router: Router,private authService:AuthService, private activatedRoute:ActivatedRoute, private collectionService:CollectionService){
    this.getDateSpaces()
    this.activatedRoute.params.subscribe(params=>{
      this.collectionId= params["id"];
      this.idCase = params["idCase"];
        if(this.collectionId!=-1){
          console.log("ID de la coleccion es ",this.collectionId);
          console.log("ID del caso es ", this.idCase); 
        }
      })
  }
  dateSpaces: DateSpace[] = [];
  collectionId: number = -1;
  idCase: number = -1;
  selectedSpace: DateSpace | null = null;

  toggleSelection(space: DateSpace) {
    this.selectedSpace = space;
  }
    
  onSubmit(form: NgForm) {
    if(form.valid){
      this.confirmDatesSpace();
    }
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

  confirmDatesSpace(){
    if(this.selectedSpace != null && this.collectionId!=-1){
      console.log(this.selectedSpace.id);
      let dateSpaceRequest = new DateSpaceRequestDto(this.collectionId, this.selectedSpace.id, this.idCase);
      console.log("dates: "+dateSpaceRequest.dateSpace_id);
      this.collectionService.reserveDatesSpace(dateSpaceRequest).subscribe(
        (response)=>{
          this.router.navigate(["/"])
        },
        (error:HttpErrorResponse)=>{
          console.log(error);
          window.alert("Ocurrio un error al reservar espacio de fabricación");
        }
      )
    }
  }
}

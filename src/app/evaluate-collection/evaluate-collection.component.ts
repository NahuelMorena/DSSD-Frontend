import { Component } from '@angular/core';
import { CollectionService } from '../services/collection-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { Collection } from '../modelos/collection';
import { HttpErrorResponse } from '@angular/common/http';
import { DateSpacesService } from '../services/date-spaces.service';
import { IDsRequestDto } from '../modelos/IDs-request-dto';

@Component({
  selector: 'app-evaluate-collection',
  templateUrl: './evaluate-collection.component.html',
  styleUrls: ['./evaluate-collection.component.css']
})
export class EvaluateCollectionComponent {

  constructor(private collectionService:CollectionService,private activatedRoute: ActivatedRoute,
    private router:Router, private authService:AuthService,private dateSpaceService:DateSpacesService){
      this.getDateSpaces()
      this.activatedRoute.params.subscribe(params=>{
        this.collectionId = params["id"];
        this.idCase = params["idCase"];
        if(this.collectionId != -1){
          collectionService.getByID(this.collectionId).subscribe(
            (response)=>{
              this.collection = response;
            },
            (error:HttpErrorResponse)=>{
              console.log(error);
              window.alert("Ocurrio un error al buscar colección");
            }
          )
          console.log("ID de la colección es ",this.collectionId);
          console.log("ID del caso es ", this.idCase);
        }
      })
  }
  collectionId:number=-1;
  idCase:number=-1;
  collection:Collection = new Collection(-1,new Date(),new Date(),new Date(),-1);
  cant_DateSpace:number=-1;

  getDateSpaces(){
    this.dateSpaceService.getDateSpaces().subscribe(
      (dateSpace)=>{
        this.cant_DateSpace = dateSpace.length;
      },
      (error:HttpErrorResponse)=>{
        if(error.status==401){
          this.authService.borrarEstadoPersistido();
          this.router.navigate(["/login"])
        } 
        else if(error.status == 403){
          this.router.navigate(["/"])
        }
      }
    );
  }

  confirmReAsignarTurno(idCollection: number, idCase: number): void {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas asignar nuevo turno de espacio de fabricación?');
    if (isConfirmed){
      console.log("Acepto la confirmación")
      this.reAsignarTurno(idCollection, idCase)
    } else {
      console.log("Rechazo la confirmación");
    }
  }

  confirmReprogramarFechas(idCollection: number, idCase: number): void {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas reprogramar fechas de la colección?');
    if (isConfirmed){
      console.log("Acepto la confirmación")
      this.reprogramarFechas(idCollection, idCase)
    } else {
      console.log("Rechazo la confirmación");
    }
  }

  confirmCancelarColeccion(idCollection: number, idCase: number): void {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas cancelar el proceso de fabricación de la colección?');
    if (isConfirmed){
      console.log("Acepto la confirmación")
      this.cancelarColeccion(idCollection, idCase)
    } else {
      console.log("Rechazo la confirmación");
    }
  }

  reAsignarTurno(idCollection: number, idCase: number){
    console.log("Re Asignar Turno");
    let idsRequest = new IDsRequestDto(idCollection,idCase);
    this.collectionService.reAsignDateSpace(idsRequest).subscribe(
      (response)=>{
        this.router.navigate(["/"])
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
        window.alert("Ocurrio un error al re asignar un espacio")
      }
    )
  }

  reprogramarFechas(idCollection: number, idCase: number){
    console.log("reprogramarFechas");
  }

  cancelarColeccion(idCollection: number, idCase: number){
    console.log("cancelar colección");
    let idsRequest = new IDsRequestDto(idCollection,idCase);
    this.collectionService.abortCollection(idsRequest).subscribe(
      (response)=>{
        this.router.navigate(["/"])
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
        window.alert("Ocurrio un error al cancelar proceso de fabricación")
      }
    )
  }
}

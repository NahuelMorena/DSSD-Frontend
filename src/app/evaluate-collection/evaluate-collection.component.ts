import { Component } from '@angular/core';
import { CollectionService } from '../services/collection-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { Collection } from '../modelos/collection';
import { HttpErrorResponse } from '@angular/common/http';
import { DateSpacesService } from '../services/date-spaces.service';
import { IDsRequestDto } from '../modelos/IDs-request-dto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-evaluate-collection',
  templateUrl: './evaluate-collection.component.html',
  styleUrls: ['./evaluate-collection.component.css']
})
export class EvaluateCollectionComponent {

  constructor(private collectionService:CollectionService,private activatedRoute: ActivatedRoute,
    private router:Router, private authService:AuthService,private dateSpaceService:DateSpacesService, private datePipe: DatePipe){
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

  reprogramarFechas(idCollection: number, idCase: number){
    console.log("reprogramarFechas");
    this.router.navigate(["/reprogramarColeccion", idCollection, idCase])
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

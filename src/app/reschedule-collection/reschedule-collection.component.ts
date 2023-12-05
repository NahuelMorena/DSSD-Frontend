import { Component } from '@angular/core';
import { CollectionService } from '../services/collection-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Collection } from '../modelos/collection';
import { NgForm } from '@angular/forms';
import { CollectionDTO } from '../modelos/collection-dto';

@Component({
  selector: 'app-reschedule-collection',
  templateUrl: './reschedule-collection.component.html',
  styleUrls: ['./reschedule-collection.component.css']
})
export class RescheduleCollectionComponent {

  constructor(private collectionService:CollectionService,private activatedRoute: ActivatedRoute,
    private router:Router, private authService:AuthService){
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
  collection:Collection = new Collection(-1, new Date(), new Date(), new Date(), -1);
  collectionDTO=new CollectionDTO(null,null,null,0,"");
  submitted=false;
  onSubmit(form:NgForm){
    if (form.valid && this.validateDates()){
      this.collectionDTO.date_start_manufacture = form.value.date_start_manufacture;
      this.collectionDTO.date_end_manufacture = form.value.date_end_manufacture;
      this.collectionDTO.estimated_release_date = form.value.estimated_release_date;
      this.submitted=true;
      this.rescheduleCollection();
    }
  }

  validateDates(): boolean {
    if(this.collection.date_start_manufacture!=null && this.collection.date_end_manufacture!=null && this.collection.estimated_release_date!=null){
      var startDate = new Date(this.collection.date_start_manufacture);
      var endDate = new Date(this.collection.date_end_manufacture);
      var estimatedDate = new Date(this.collection.estimated_release_date);
  
      if (startDate>new Date() && startDate < endDate && endDate < estimatedDate) {
        return true;
      } else {
        window.alert('Las fechas no cumplen las condiciones');
        return false;
      }
    }else{
      return false;
    }
  }

  rescheduleCollection():void{
    this.collectionService.rescheduleCollection(this.collectionId, this.idCase, this.collectionDTO).subscribe(
      (response)=> {
        console.log(response);
        window.alert("Coleccion actualizada exitosamente")
        this.router.navigate(["/"])
      },
      (error:HttpErrorResponse)=>{
        console.error("Error al actualizar la colección", error)
      }
    )
  }
}

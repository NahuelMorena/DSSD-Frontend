import { Component } from '@angular/core';
import { CollectionService } from '../services/collection-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Collection } from '../modelos/collection';
import { NgForm } from '@angular/forms';
import { CollectionDTO } from '../modelos/collection-dto';
import { DateSpacesService } from '../services/date-spaces.service';
import { DateDto } from '../modelos/date-dto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reschedule-collection',
  templateUrl: './reschedule-collection.component.html',
  styleUrls: ['./reschedule-collection.component.css']
})
export class RescheduleCollectionComponent {

  constructor(private collectionService:CollectionService,private activatedRoute: ActivatedRoute,
    private router:Router, private authService:AuthService, private dateSpaceService:DateSpacesService, private datePipe:DatePipe){
      this.activatedRoute.params.subscribe(params=>{
        this.collectionId = params["id"];
        this.idCase = params["idCase"];
        if(this.collectionId != -1){
          this.getLastDeliveryDate();
          collectionService.getByID(this.collectionId).subscribe(
            (response)=>{
              this.collection = response;
              this.dateDto.available_from = response.date_start_manufacture ? this.datePipe.transform(response.date_start_manufacture, 'dd-MM-yyyy') : null;
              this.dateDto.available_until = response.date_end_manufacture ? this.datePipe.transform(response.date_end_manufacture, 'dd-MM-yyyy') : null;
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
  dateDto:DateDto = new DateDto("","");
  cant_DateSpace:number = -1;
  lastDate:string="";
  onSubmit(form:NgForm){
    if (form.valid && this.validateDates()){
      this.dateDto.available_from = form.value.date_start_manufacture ? this.datePipe.transform(form.value.date_start_manufacture, 'dd-MM-yyyy') : null;
      this.dateDto.available_until = form.value.date_end_manufacture ? this.datePipe.transform(form.value.date_end_manufacture, 'dd-MM-yyyy') : null;
      console.log("Se van a buscar espacios de fabricación");
      this.getDateSpaces().then((result: number) => {
        if (result == 0){
          window.alert('No se encuentran espacios de fabricación en base a las fechas dadas');
        } else {
          console.log("Esta todo en orden para reprogramar la colección");
          this.collectionDTO.date_start_manufacture = form.value.date_start_manufacture;
          this.collectionDTO.date_end_manufacture = form.value.date_end_manufacture;
          this.collectionDTO.estimated_release_date = form.value.estimated_release_date;
          this.submitted=true;
          this.rescheduleCollection();
        }
      }).catch((error) => {
        console.error("Error:", error);
      });
    }
  }

  validateDates(): boolean {
    if(this.collection.date_start_manufacture!=null && this.collection.date_end_manufacture!=null && this.collection.estimated_release_date!=null){
      var startDate = new Date(this.collection.date_start_manufacture);
      var endDate = new Date(this.collection.date_end_manufacture);
      var estimatedDate = new Date(this.collection.estimated_release_date);
      
      var lastDateParts = this.lastDate.split("-");
      var lastDate = new Date(
          parseInt(lastDateParts[2]),  // Año
          parseInt(lastDateParts[1]) - 1,  // Mes (restamos 1 porque los meses en JavaScript son 0-indexados)
          parseInt(lastDateParts[0])  // Día
      );

      console.log(lastDate.toISOString());
      if (startDate>new Date() && lastDate < startDate && startDate < endDate && endDate < estimatedDate) {
        return true;
      } else {
        window.alert('Las fechas no cumplen las condiciones');
        return false;
      }
    }else{
      return false;
    }
  }

  async getDateSpaces(): Promise<number> {
    try {
      const dateSpace = await this.dateSpaceService.getDateSpacesByDates(this.dateDto).toPromise();
      return dateSpace ? dateSpace.length : 0;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.authService.borrarEstadoPersistido();
          this.router.navigate(["/login"]);
        } else if (error.status === 403) {
          this.router.navigate(["/"]);
        }
      }
      throw error;
    }
  }

  getLastDeliveryDate(){
    this.collectionService.getReservesByCollectionId(this.collectionId).subscribe(
      (response)=> {
        console.log("cantidad de reservas: ",response.length);
        console.log("reserva: ", response);

        if (response.length > 0){
          const lastReserve = response.reduce((maxReserve, currentReserve) => {
            const maxDate = new Date(maxReserve.delivery_date);
            const currentDate = new Date(currentReserve.delivery_date);

            return currentDate > maxDate ? currentReserve : maxReserve;
          });
          
          this.lastDate = lastReserve.delivery_date;
          console.log("Reserva con la fecha de entrega original: ", this.lastDate);
        
        } else {
          console.log("No se han encontrado reservas");
        }
      },
      (error:HttpErrorResponse)=>{
        console.error("Error buscar reservas", error)
      }
    )
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

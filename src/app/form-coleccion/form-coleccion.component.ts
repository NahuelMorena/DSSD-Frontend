import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Furniture } from '../modelos/furniture';
import { FurnitureService } from '../services/furniture-service';
import { HttpErrorResponse } from '@angular/common/http';
import { CollectionDTO } from '../modelos/collection-dto';
import { CollectionService } from '../services/collection-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-form-coleccion',
  templateUrl: './form-coleccion.component.html',
  providers:[FurnitureService,CollectionService],
  styleUrls: ['./form-coleccion.component.css']
})
export class FormColeccionComponent {

  constructor(private furnitureService:FurnitureService,private collectionService:CollectionService,private router: Router,private authService:AuthService){
    this.getMuebles()
  }
  furnitures:Furniture[]=[];
  collection=new CollectionDTO(null,null,null,0,"");
  submitted=false;
  onSubmit(form:NgForm){
    if (form.valid && this.collection.units > 0 && this.validateDates() && this.furnitures.length>0){
      this.collection.date_start_manufacture=form.value.date_start_manufacture;
      this.collection.date_end_manufacture=form.value.date_end_manufacture;
      this.collection.estimated_release_date=form.value.estimated_release_date
      this.collection.units=form.value.units;
      this.collection.mail=form.value.mail;
      this.submitted=true;
      this.createCollection();
    }
  }

  getMuebles(){
    this.furnitureService.getFurnitures().subscribe(
      (muebles)=>{
        this.furnitures=muebles;
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

  toggleSelection(furniture: Furniture) {
    const index = this.collection.furnitures.indexOf(furniture);
    if (index !== -1) {
      this.collection.furnitures.splice(index, 1);
    } else {
      this.collection.furnitures.push(furniture);
    }
    console.log(this.collection.furnitures);
  }

  createCollection():void{
    this.collectionService.createCollection(this.collection).subscribe(
      (response)=> {
        console.log(response);
        window.alert("Coleccion creada exitosamente")
      },
      (error:HttpErrorResponse)=>{
        console.error("Error al crear la colección ", error)
      }
    )
  }
}

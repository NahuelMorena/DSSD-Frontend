import { Component } from '@angular/core';
import { Collection } from '../modelos/collection';
import { NgForm } from '@angular/forms';
import { Category } from '../modelos/category';
import { Furniture } from '../modelos/furniture';
import { FurnitureService } from '../services/furniture-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-coleccion',
  templateUrl: './form-coleccion.component.html',
  providers:[FurnitureService],
  styleUrls: ['./form-coleccion.component.css']
})
export class FormColeccionComponent {

  constructor(private furnitureService:FurnitureService){
    this.getMuebles()
  }
  furnitures:Furniture[]=[];
  collection=new Collection(-1,new Date(),new Date(),new Date(),"");
  muebleSeleccionado:Furniture=new Furniture(0,"","",Category.CAMA)
  submitted=false;
  onSubmit(form:NgForm){
    if(form.valid){
      this.collection.date_start_manufacture=form.value.fechaInicioFabricacion;
      this.collection.date_end_manufacture=form.value.fechaFinFabricacion;
      this.collection.estimated_release_date=form.value.estimated_release_date
      this.submitted=true;
    }
  }

  getMuebles(){
    this.furnitureService.getFurnitures().subscribe(
      (muebles)=>{
        this.furnitures=muebles;
      }
      ,(error:HttpErrorResponse)=>{
        console.log("No se pueden recuperar los muebles "+error.status)
      }
    );
    
  }
}

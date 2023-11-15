import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../modelos/category';
import { Furniture } from '../modelos/furniture';
import { FurnitureService } from '../services/furniture-service';
import { HttpErrorResponse } from '@angular/common/http';
import { CollectionDTO } from '../modelos/collection-dto';
import { CollectionService } from '../services/collection-service';
import { EstablishMaterialsComponent } from '../establish-materials/establish-materials.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-coleccion',
  templateUrl: './form-coleccion.component.html',
  providers:[FurnitureService,CollectionService],
  styleUrls: ['./form-coleccion.component.css']
})
export class FormColeccionComponent {

  constructor(private furnitureService:FurnitureService,private collectionService:CollectionService,private router: Router){
    this.getMuebles()
  }
  furnitures:Furniture[]=[];
  collection=new CollectionDTO(null,null,null);
  submitted=false;
  onSubmit(form:NgForm){
    if(form.valid){
      this.collection.date_start_manufacture=form.value.date_start_manufacture;
      this.collection.date_end_manufacture=form.value.date_end_manufacture;
      this.collection.estimated_release_date=form.value.estimated_release_date
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
        console.log("No se pueden recuperar los muebles "+error.status)
      }
    );
    
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
        this.router.navigate(["/establecerMateriales"],{
          queryParams:{collectionId:response.id}
        })
      },
      (error:HttpErrorResponse)=>{
        console.error("Error al crear la colección ", error)
      }
    )
  }
}

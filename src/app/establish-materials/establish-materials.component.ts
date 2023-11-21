import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MaterialDto } from '../modelos/materialdto';
import { MaterialService } from '../services/material-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Material } from '../modelos/material';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CollectionService } from '../services/collection-service';
import { MaterialRequestDto } from '../modelos/material-request-dto';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-establish-materials',
  templateUrl: './establish-materials.component.html',
  styleUrls: ['./establish-materials.component.css']
})
export class EstablishMaterialsComponent {

  constructor(private collectionService:CollectionService,private materialService:MaterialService,private activatedRoute: ActivatedRoute,
    private router:Router,private authService:AuthService){
    this.getMaterials();
    this.activatedRoute.params.subscribe(params=>{
    this.collectionId= params["id"];
      if(this.collectionId!=-1){
        console.log("ID de la coleccion es ",this.collectionId);
      }
    })
  }
  collectionId:number=-1;
  materials:Material[]=[];
  selectedMaterials:MaterialDto[]=[];
  material:Material=new Material(0,"","");
  quantity=0;
  onSubmit(form:NgForm){
    if(form.valid){
      this.confirmMaterials();
    }
  }

  getMaterials(){
    this.materialService.getMaterials().subscribe(
      (materials)=>{
        this.materials=materials;
        if(this.materials.length>0){
          this.material=this.materials[0]
        }
      }
      ,(error:HttpErrorResponse)=>{
        if(error.status==401){
          this.authService.borrarEstadoPersistido()
          this.router.navigate(["/login"])
        }
        else if(error.status==403){
          this.router.navigate(["/"])
        }
      }
    );
    
  }

  addMaterial(): void {
    if(this.quantity>0){
      var existingMaterial= this.selectedMaterials.find(obj => obj.name === this.material.name);
      if( existingMaterial){
        existingMaterial.quantity=existingMaterial.quantity+this.quantity;
      }else{
        var m=new MaterialDto(this.material.name,this.quantity);
        this.selectedMaterials.push(m);
      }
    }
  }

  deleteMaterial(index: number): void {
    this.selectedMaterials.splice(index, 1);
  }

  confirmMaterials(){
    console.log(this.selectedMaterials)
    if(this.selectedMaterials.length > 0 && this.collectionId!=-1){
      let materialRequest=new MaterialRequestDto(this.collectionId,this.selectedMaterials);
      this.collectionService.confirmMaterials(materialRequest).subscribe(
        (response)=>{
          this.router.navigate(["/reservarMateriales"])
        },
        (error:HttpErrorResponse)=>{
          console.log(error);
          window.alert("Ocurrio un error al establecer los materiales")
        }
      )
    }
  }

}

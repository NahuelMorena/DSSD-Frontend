import { Component } from '@angular/core';
import { MaterialDto } from '../modelos/materialdto';
import { MaterialService } from '../services/material-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialRequestDto } from '../modelos/material-request-dto';
import { CollectionService } from '../services/collection-service';
import { OffersByApiDTO } from '../modelos/offers-by-api-dto';
import { NgForm } from '@angular/forms';
import { BonitaService } from '../services/bonita-service';

@Component({
  selector: 'app-materials-query-api',
  templateUrl: './materials-query-api.component.html',
  styleUrls: ['./materials-query-api.component.css']
})
export class MaterialsQueryApiComponent {
  materials:MaterialDto[]=[];
  collectionId:number=-1;
  caseId:number=-1;
  offers:OffersByApiDTO[]=[]
  date=new Date();
  submitted=false;
  quantitiesByName: { [key: string]: number } = {};
  formExecuted=false;


  constructor(private materialService:MaterialService,private router:Router,private authService:AuthService,private activatedRoute: ActivatedRoute,
    private collectionService:CollectionService,private bonitaService:BonitaService){
    this.activatedRoute.params.subscribe(params=>{
    this.collectionId= params["id"];
    this.caseId=params["idCase"]
    })
    if(this.collectionId!=-1 && this.caseId!=-1){
      this.getMaterialsInCollection();
    }

  }

  onSubmit(form:NgForm){
    var dateString:String = form.value.date;
     var parts=dateString.split("-");
    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1; 
    var day = parseInt(parts[2], 10);
    var selectedDate = new Date(year, month, day);
    if (form.valid && selectedDate  > new Date()){
      this.date=form.value.date;
      this.submitted=true;
      this.getOffers();
    }
  }

  getMaterialsInCollection(){
    this.materialService.getMaterialsInCollection(this.collectionId).subscribe(
      (response)=>{
        this.materials=response;
      },(error:HttpErrorResponse)=>{
        if(error.status==401){
          this.authService.borrarEstadoPersistido()
          this.router.navigate(["/login"])
        }
        else if(error.status==403){
          this.router.navigate(["/"])
        }
      }
    )
  }

  getOffers():void{
    this.collectionService.searchOffers(this.collectionId,this.date).subscribe(
      (response)=>{
        this.offers=response;
        this.setQuantitiesByName();
        this.formExecuted=true;
      },(error:HttpErrorResponse)=>{
        if(error.status==401){
          this.authService.borrarEstadoPersistido()
          this.router.navigate(["/login"])
        }
        else if(error.status==403){
          this.router.navigate(["/"])
        }
      }
    )
  }

  setQuantitiesByName(){
    this.quantitiesByName={};
    this.offers.forEach(offer => {
      const materialName = offer.material.name;
      if (this.quantitiesByName[materialName]) {
          this.quantitiesByName[materialName] += offer.quantity_available;
      } else {
          this.quantitiesByName[materialName] = offer.quantity_available;
    }
});
  }

  foundMaterial(name:string):boolean{
    var material=this.materials.find(material=>material.name===name);
    if(material!=undefined){
      console.log(this.quantitiesByName[name])
      console.log(material.quantity)
      return this.quantitiesByName[name]>=material.quantity;
    }
    else
      return false;
  }

  allMaterialsFound(): boolean {
    return this.materials.every(material => this.foundMaterial(material.name));
  }

  advance(){
    this.bonitaService.nextTaskAPIQuery(this.caseId).subscribe(
      (response)=>{
        this.router.navigate(["/reservarMateriales"])
      },
      (error:HttpErrorResponse)=>{
        window.alert("Ocurrio un error")
      }
      
    )
  }


}

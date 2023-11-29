import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { CollectionService } from '../services/collection-service';
import { BonitaService } from '../services/bonita-service';
import { HttpErrorResponse } from '@angular/common/http';
import { OffersByApiDTO } from '../modelos/offers-by-api-dto';
import { MaterialService } from '../services/material-service';
import { MaterialDto } from '../modelos/materialdto';
import { Offer } from '../modelos/offer';
import { OffersToReserveDTO } from '../modelos/offers-to-reserve-dto';

@Component({
  selector: 'app-reserve-materials',
  templateUrl: './reserve-materials.component.html',
  styleUrls: ['./reserve-materials.component.css']
})
export class ReserveMaterialsComponent {
  collectionId:number=-1;
  materials:MaterialDto[]=[];
  caseId:number=-1;
  dateQuery=new Date();
  offers:OffersByApiDTO[]=[]
  materialsNeeded:{ [key: string]: number } = {};
  constructor(private router:Router,private authService:AuthService,private activatedRoute: ActivatedRoute,
    private collectionService:CollectionService,private bonitaService:BonitaService,private materialService:MaterialService){
    this.activatedRoute.params.subscribe(params=>{
    this.collectionId= params["id"];
    this.caseId=params["idCase"]
    })
    if(this.collectionId!=-1 && this.caseId!=-1){
      this.getQueryDate().then(()=>{
        this.getOffers();
        this.getMaterialsInCollection();
      })
    }

  }

  getQueryDate():Promise<void>{
    return new Promise<void>((resolve,reject)=>{this.bonitaService.getQueryDate(this.caseId).subscribe(
      (response)=>{
        this.dateQuery=response;
        resolve();
      },(error:HttpErrorResponse)=>{
        if(error.status==401){
          this.authService.borrarEstadoPersistido()
          this.router.navigate(["/login"])
        }
        else if(error.status==403){
          this.router.navigate(["/"])
        }
        reject();
      }
    )})
  }

  getOffers():void{
    this.collectionService.searchOffers(this.collectionId,this.dateQuery).subscribe(
      (response)=>{
        this.offers=response;
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

  getMaterialsInCollection(){
    this.materialService.getMaterialsInCollection(this.collectionId).subscribe(
      (response)=>{
        this.materials=response;
        this.setMaterialsNeeded();
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

  reserve(idOffer:number,quantity:number,materialName:string){
    var userInput = window.prompt('Ingrese la cantidad que desea reservar:');
    if (userInput !== null) {
      var quantityInput = Number(userInput);
      console.log("quantity:"+quantity);
      console.log()
      if (!isNaN(quantityInput)) {
        if((quantityInput<=quantity)&&(quantityInput<=this.materialsNeeded[materialName])){
          var offer=new Offer(idOffer,quantityInput,materialName);
          var list:Offer[]=[];
          list.push(offer);
          var offerToReserveDto=new OffersToReserveDTO(list);
          this.collectionService.reserveMaterials(offerToReserveDto,this.collectionId).subscribe(
            (response)=>{
              window.alert("Se reservo exitosamente");
              this.getMaterialsInCollection();
              this.getOffers();
            }
          )
        }
        else{
          window.alert("La cantidad debe ser menor o igual a la cantidad que se necesita y a la cantidad de la oferta ")
        }
      }
      else{
        window.alert("No es un numero");
      }
    }
  }

  setMaterialsNeeded(){
    this.materialsNeeded={};
    this.materials.forEach(material => {
      var materialName = material.name;
      if (this.materialsNeeded[materialName]) {
          this.materialsNeeded[materialName] += material.quantity;
      } else {
          this.materialsNeeded[materialName] = material.quantity;
    }
});
  }

  allQuantitiesAreZero(): boolean {
    return this.materials.every(material => material.quantity === 0);
  }

  advance(){
    this.bonitaService.nextTaskReserveMaterial(this.caseId).subscribe(
      (response)=>{
        this.router.navigate(["/"])
      },
      (error:HttpErrorResponse)=>{
        console.log(error)
      }
      
    )
  }


}

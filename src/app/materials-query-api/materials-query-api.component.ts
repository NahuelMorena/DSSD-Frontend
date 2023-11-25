import { Component } from '@angular/core';
import { MaterialDto } from '../modelos/materialdto';
import { MaterialService } from '../services/material-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialRequestDto } from '../modelos/material-request-dto';
import { CollectionService } from '../services/collection-service';
import { OffersByApiDTO } from '../modelos/offers-by-api-dto';

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

  constructor(private materialService:MaterialService,private router:Router,private authService:AuthService,private activatedRoute: ActivatedRoute,
    private collectionService:CollectionService){
    this.activatedRoute.params.subscribe(params=>{
    this.collectionId= params["id"];
    this.caseId=params["idCase"]
    })
    if(this.collectionId!=-1 && this.caseId!=-1){
      this.getMaterialsInCollection();
    }

  }

  getMaterialsInCollection(){
    this.materialService.getMaterialsInCollection(87).subscribe(
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
    this.collectionService.searchOffers(this.collectionId).subscribe(
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

  foundMaterial(name:string):boolean{
    return this.offers.some(offer=> offer.material.name === name);
  }

}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Furniture } from "../modelos/furniture";
import { Collection } from "../modelos/collection";
import { CollectionDTO } from "../modelos/collection-dto";
import { MaterialRequestDto } from "../modelos/material-request-dto";
import { OffersByApiDTO } from "../modelos/offers-by-api-dto";
import { OrderRequestDto } from "../modelos/order-request-dto";
import { LaunchRequestDto } from "../modelos/launch-request-dto";
import { DatePipe } from "@angular/common";
import { Offer } from "../modelos/offer";
import { OffersToReserveDTO } from "../modelos/offers-to-reserve-dto";
import { DateSpaceRequestDto } from "../modelos/dateSpace-request-dto";


@Injectable()
export class CollectionService {
    private url='http://localhost:8080/api/collections'
    constructor(private http: HttpClient, private datePipe: DatePipe) {}
    
      public createCollection(collection:CollectionDTO):Observable<Collection> {
        return this.http.post<Collection>(this.url+"/create-collection", collection,{withCredentials:true});
      }

      public getByID(id:number):Observable<Collection> {
        return this.http.post<Collection>(this.url+"/get-collection",{id: id},{withCredentials:true});
      }

      public confirmMaterials(materialRequest:MaterialRequestDto):Observable<String>{
        return this.http.post<String>(this.url+"/establishMaterials",materialRequest,{withCredentials:true,responseType: 'text' as "json"})
      }

      public setDistributionOrder(orderRequest:OrderRequestDto):Observable<String>{
        return this.http.post<String>(this.url+"/set-distribution-order",orderRequest,{withCredentials:true,responseType: 'text' as "json"})
      }

      public launchCollection(launchRequest:LaunchRequestDto):Observable<String>{
        return this.http.post<String>(this.url+"/launch-to-market",launchRequest,{withCredentials:true,responseType: "text" as "json"})
      }
      
      public searchOffers(idCollection:number,dateParameter:Date):Observable<OffersByApiDTO[]>{
        var formattedDate = this.datePipe.transform(dateParameter, 'dd-MM-yyyy');
        return this.http.get<OffersByApiDTO[]>(this.url+"/search-material-offers/"+idCollection+"?dateStart="+formattedDate,{withCredentials:true})
      }

      public reserveMaterials(offer:OffersToReserveDTO,collectionId:number):Observable<any>{
        return this.http.post<any>(this.url+"/reserve-materials/"+collectionId,offer,{withCredentials:true})
      }
      
      public reserveDatesSpace(dateSpaceRequest:DateSpaceRequestDto):Observable<String>{
        return this.http.post<String>(this.url+"/reserve-dateSpace",dateSpaceRequest,{withCredentials:true,responseType: 'text' as 'json'})
      }
}
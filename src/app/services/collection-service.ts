import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Furniture } from "../modelos/furniture";
import { Collection } from "../modelos/collection";
import { CollectionDTO } from "../modelos/collection-dto";
import { MaterialRequestDto } from "../modelos/material-request-dto";
import { OffersByApiDTO } from "../modelos/offers-by-api-dto";

@Injectable()
export class CollectionService {
    private url='http://localhost:8080/api/collections'
    constructor(private http: HttpClient) {}
    
      public createCollection(collection:CollectionDTO):Observable<Collection> {
        return this.http.post<Collection>(this.url+"/create-collection", collection,{withCredentials:true});
      }

      public confirmMaterials(materialRequest:MaterialRequestDto):Observable<String>{
        return this.http.post<String>(this.url+"/establishMaterials",materialRequest,{withCredentials:true,responseType: 'text' as "json"})
      }

      public searchOffers(idCollection:number):Observable<OffersByApiDTO[]>{
        return this.http.get<OffersByApiDTO[]>(this.url+"/search-material-offers/"+idCollection,{withCredentials:true})
      }

    }
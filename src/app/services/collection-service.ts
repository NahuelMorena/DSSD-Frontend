import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Furniture } from "../modelos/furniture";
import { Collection } from "../modelos/collection";
import { CollectionDTO } from "../modelos/collection-dto";

@Injectable()
export class CollectionService {
    private url='http://localhost:8080/api/collections'
    constructor(private http: HttpClient) {}
    
      public createCollection(collection:CollectionDTO):Observable<Collection> {
        return this.http.post<Collection>(this.url+"/create-collection", collection,{withCredentials:true});
      }
    }
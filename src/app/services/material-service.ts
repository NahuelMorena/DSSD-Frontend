import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MaterialDto } from "../modelos/materialdto";
import { Material } from "../modelos/material";

@Injectable()
export class MaterialService {
    private url='http://localhost:8080/api/materials'
    constructor(private http: HttpClient) {}
    
      public getMaterials():Observable<Material[]> {
        return this.http.get<Material[]>(this.url+"/get-materials",{withCredentials:true});
      }

      public getMaterialsInCollection(collectionId:number):Observable<MaterialDto[]>{
        return this.http.get<MaterialDto[]>(this.url+"/getMaterialsCollection/"+collectionId,{withCredentials:true})
      }
}
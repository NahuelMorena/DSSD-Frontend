import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TaskStablishMaterialsDTO } from "../modelos/task-stablish-materials-dto";

@Injectable()
export class BonitaService {
    private url='http://localhost:8080/api/bonita'
    constructor(private http: HttpClient) {}
    
      public getTasks():Observable<TaskStablishMaterialsDTO[]> {
        return this.http.get<TaskStablishMaterialsDTO[]>(this.url+"/getTasksStablishMaterials", {withCredentials:true});
      }
    }
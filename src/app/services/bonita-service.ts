import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TaskStablishMaterialsDTO } from "../modelos/task-stablish-materials-dto";
import { LoginRequest } from "../modelos/requestDto/login-request";

@Injectable()
export class BonitaService {
    private url='http://localhost:8080/api/bonita'
    constructor(private http: HttpClient) {}
    
      public getTasks():Observable<TaskStablishMaterialsDTO[]> {
        return this.http.get<TaskStablishMaterialsDTO[]>(this.url+"/getTasksStablishMaterials", {withCredentials:true});
      }

      public getTasksQueryApi():Observable<TaskStablishMaterialsDTO[]>{
        return this.http.get<TaskStablishMaterialsDTO[]>(this.url+"/getTasksQueryApi",{withCredentials:true})
      }

      public nextTaskAPIQuery(idCase:number):Observable<any>{
        return this.http.post<any>(this.url+"/nextTaskAPIQuery/"+idCase,null,{withCredentials:true,responseType: 'text' as "json"})
      }
    }
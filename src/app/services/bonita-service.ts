import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TaskDTO } from "../modelos/task-dto";
import { LoginRequest } from "../modelos/requestDto/login-request";

@Injectable()
export class BonitaService {
    private url='http://localhost:8080/api/bonita'
    constructor(private http: HttpClient) {}
    
      public getStablishMaterialsTasks():Observable<TaskDTO[]> {
        return this.http.get<TaskDTO[]>(this.url+"/getTasksStablishMaterials", {withCredentials:true});
      }

      public getPlanDitributionOrdersTasks():Observable<TaskDTO[]> {
        return this.http.get<TaskDTO[]>(this.url+"/planDistributionOrders", {withCredentials:true});
      }

      public getLaunchCollectionTasks():Observable<TaskDTO[]> {
        return this.http.get<TaskDTO[]>(this.url+"/launchCollection", {withCredentials:true});
      }
    }
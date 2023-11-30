import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TaskDTO } from "../modelos/task-dto";
import { LoginRequest } from "../modelos/requestDto/login-request";
import { ArchivedCaseDTO } from "../modelos/archived-case-dto";

@Injectable()
export class BonitaService {
    private url='http://localhost:8080/api/bonita'
    constructor(private http: HttpClient) {}
    
      public getStablishMaterialsTasks():Observable<TaskDTO[]> {
        return this.http.get<TaskDTO[]>(this.url+"/getTasksStablishMaterials", {withCredentials:true});
      }

      public getReserveDatesSpaceTasks():Observable<TaskDTO[]> {
        return this.http.get<TaskDTO[]>(this.url+"/getTaskReserveDatesSpace", {withCredentials:true});
      }

      public getPlanDitributionOrdersTasks():Observable<TaskDTO[]> {
        return this.http.get<TaskDTO[]>(this.url+"/planDistributionOrders", {withCredentials:true});
      }

      public getLaunchCollectionTasks():Observable<TaskDTO[]> {
        return this.http.get<TaskDTO[]>(this.url+"/launchCollection", {withCredentials:true});
      }

      public getTasksQueryApi():Observable<TaskDTO[]>{
        return this.http.get<TaskDTO[]>(this.url+"/getTasksQueryApi",{withCredentials:true})
      }

      public nextTaskAPIQuery(idCase:number):Observable<any>{
        return this.http.post<any>(this.url+"/nextTaskAPIQuery/"+idCase,null,{withCredentials:true,responseType: 'text' as "json"})
      }

      public getArchivedCases():Observable<ArchivedCaseDTO[]>{
        return this.http.get<ArchivedCaseDTO[]>(this.url+"/getArchivedCases",{withCredentials:true})
      }
    }
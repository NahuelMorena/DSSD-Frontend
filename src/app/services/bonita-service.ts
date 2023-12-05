import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TaskDTO } from "../modelos/task-dto";
import { LoginRequest } from "../modelos/requestDto/login-request";
import { ArchivedCaseDTO } from "../modelos/archived-case-dto";
import { DatePipe } from "@angular/common";

@Injectable()
export class BonitaService {
    private url='http://localhost:8080/api/bonita'
    constructor(private http: HttpClient,private datePipe:DatePipe) {}
    
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

      public getTaskEvaluateCollection():Observable<TaskDTO[]>{
        return this.http.get<TaskDTO[]>(this.url+"/getTasksEvaluateCollection",{withCredentials:true})
      }

      public nextTaskAPIQuery(idCase:number,dateForm:Date):Observable<any>{
        var formattedDate = this.datePipe.transform(dateForm, 'dd-MM-yyyy');
        return this.http.post<any>(this.url+"/nextTaskAPIQuery/"+idCase,formattedDate,{withCredentials:true,responseType: 'text' as "json"})
      }

      public getArchivedCases():Observable<ArchivedCaseDTO[]>{
        return this.http.get<ArchivedCaseDTO[]>(this.url+"/getArchivedCases",{withCredentials:true})
      }

      public getTasksReserveProvider():Observable<TaskDTO[]>{
        return this.http.get<TaskDTO[]>(this.url+"/getTasksReserveProvider",{withCredentials:true})
      }

      public getQueryDate(idCase:number):Observable<Date>{
        return this.http.get<Date>(this.url+"/getQueryDate/"+idCase,{withCredentials:true})
      }

      public nextTaskReserveMaterial(idCase:number):Observable<any>{
        return this.http.post<any>(this.url+"/nextTaskReserveMaterials/"+idCase,null,{withCredentials:true,responseType: 'text' as "json"})
      }

      public getFailedCases():Observable<number>{
        return this.http.get<number>(this.url+"/getFailedCases",{withCredentials:true})
      }
    }
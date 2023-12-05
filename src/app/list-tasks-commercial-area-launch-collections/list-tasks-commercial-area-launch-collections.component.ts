import { Component } from '@angular/core';
import { TaskDTO } from '../modelos/task-dto';
import { BonitaService } from '../services/bonita-service';
import { AuthService } from '../services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core'; 
import { IDsRequestDto } from '../modelos/IDs-request-dto';
import { CollectionService } from '../services/collection-service';

@Component({
  selector: 'app-list-tasks-commercial-area-launch-collections',
  templateUrl: './list-tasks-commercial-area-launch-collections.component.html',
  styleUrls: ['./list-tasks-commercial-area-launch-collections.component.css']
})
export class ListTasksCommercialAreaLaunchCollectionsComponent {
  tasks:TaskDTO[]=[]
  page=1
  count=0
  itemsPerPage=8
  constructor(private bonitaService: BonitaService,private router:Router,private authService:AuthService,private zone: NgZone,private collectionService:CollectionService){
    this.getTasks()
  }

  getTasks():void{
    this.bonitaService.getLaunchCollectionTasks().subscribe(
      (tasks)=>{
        this.tasks=tasks;
      },
      (error:HttpErrorResponse)=>{
        if(error.status==401){
          this.authService.borrarEstadoPersistido();
          this.router.navigate(["/login"])
        }
        else if(error.status==403){
          this.router.navigate(["/"])
        } 
      }
    )
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  confirmLaunchCollection(idCollection: number, idCase: number): void {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas lanzar la colección?');
    if (isConfirmed){
      console.log("Acepto la confirmación")
      this.confirmLaunch(idCollection, idCase)
    } else {
      console.log("Rechazo la confirmación");
    }
  }

  confirmLaunch(idCollection: number, idCase: number){
    let launchRequest = new IDsRequestDto(idCollection,idCase);
    this.collectionService.launchCollection(launchRequest).subscribe(
      (response)=>{
        this.router.navigate(["/"])
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
        window.alert("Ocurrio un error al lanzar colección al mercado");
      }
    )
  }

  
}

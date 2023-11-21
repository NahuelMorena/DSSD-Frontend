import { Component } from '@angular/core';
import { TaskStablishMaterialsDTO } from '../modelos/task-stablish-materials-dto';
import { BonitaService } from '../services/bonita-service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-list-tasks-operation-area',
  templateUrl: './list-tasks-operation-area.component.html',
  styleUrls: ['./list-tasks-operation-area.component.css']
})
export class ListTasksOperationAreaComponent {
  tasks:TaskStablishMaterialsDTO[]=[]
  page=1
  count=0
  itemsPerPage=8
  constructor(private bonitaService: BonitaService,private router:Router,private authService:AuthService){
    this.getTasks()
  }


  getTasks():void{
    this.bonitaService.getTasks().subscribe(
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
}

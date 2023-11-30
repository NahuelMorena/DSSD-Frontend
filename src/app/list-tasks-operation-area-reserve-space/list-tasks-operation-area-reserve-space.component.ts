import { Component } from '@angular/core';
import { TaskDTO } from '../modelos/task-dto';
import { BonitaService } from '../services/bonita-service';
import { AuthService } from '../services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-tasks-operation-area-reserve-space',
  templateUrl: './list-tasks-operation-area-reserve-space.component.html',
  styleUrls: ['./list-tasks-operation-area-reserve-space.component.css']
})
export class ListTasksOperationAreaReserveSpaceComponent {
  tasks:TaskDTO[]=[]
  page=1
  count=0
  itemsPerPage=8
  constructor(private bonitaService: BonitaService,private router:Router, private authService:AuthService){
    this.getTasks()
  }

  getTasks():void{
    this.bonitaService.getReserveDatesSpaceTasks().subscribe(
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

  onTableDataChange(event: any){
    this.page = event;
  }
}

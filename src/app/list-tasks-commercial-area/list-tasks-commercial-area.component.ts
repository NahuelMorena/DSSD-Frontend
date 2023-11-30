import { Component } from '@angular/core';
import { TaskDTO } from '../modelos/task-dto';
import { BonitaService } from '../services/bonita-service';
import { AuthService } from '../services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-tasks-commercial-area',
  templateUrl: './list-tasks-commercial-area.component.html',
  styleUrls: ['./list-tasks-commercial-area.component.css']
})
export class ListTasksCommercialAreaComponent {
  tasks:TaskDTO[]=[]
  page=1
  count=0
  itemsPerPage=8
  constructor(private bonitaService: BonitaService,private router:Router,private authService:AuthService){
    this.getTasks()
  }

  getTasks():void{
    this.bonitaService.getPlanDitributionOrdersTasks().subscribe(
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

import { Component } from '@angular/core';
import { TaskDTO } from '../modelos/task-dto';
import { BonitaService } from '../services/bonita-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-task-reserve-provider',
  templateUrl: './list-task-reserve-provider.component.html',
  styleUrls: ['./list-task-reserve-provider.component.css']
})
export class ListTaskReserveProviderComponent {
  tasks:TaskDTO[]=[]
  page=1
  count=0
  itemsPerPage=8
  constructor(private bonitaService: BonitaService,private router:Router,private authService:AuthService){
    this.getTasks()
  }


  getTasks():void{
    this.bonitaService.getTasksReserveProvider().subscribe(
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

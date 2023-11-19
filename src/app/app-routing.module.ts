import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormColeccionComponent } from './form-coleccion/form-coleccion.component';
import { EstablishMaterialsComponent } from './establish-materials/establish-materials.component';
import { ReserveMaterialsComponent } from './reserve-materials/reserve-materials.component';
import { ListTasksOperationAreaComponent } from './list-tasks-operation-area/list-tasks-operation-area.component';


const routes: Routes = [
  /*{path:'',component:HomeComponent,canActivate:[AuthGuard]},*/
  {path: 'crearColeccion',component:FormColeccionComponent},
  {path: 'establecerMateriales/:id',component:EstablishMaterialsComponent},
  {path:'reservarMateriales',component:ReserveMaterialsComponent},
  {path:'listadoTareas',component:ListTasksOperationAreaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormColeccionComponent } from './form-coleccion/form-coleccion.component';
import { EstablishMaterialsComponent } from './establish-materials/establish-materials.component';
import { ReserveMaterialsComponent } from './reserve-materials/reserve-materials.component';
import { ListTasksOperationAreaComponent } from './list-tasks-operation-area/list-tasks-operation-area.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth-service';


const routes: Routes = [
  {path: 'crearColeccion',component:FormColeccionComponent,canActivate:[AuthService]},
  {path: 'establecerMateriales/:id/:idCase',component:EstablishMaterialsComponent,canActivate:[AuthService]},
  {path:'reservarMateriales',component:ReserveMaterialsComponent,canActivate:[AuthService]},
  {path:'listadoEstablecerMateriales',component:ListTasksOperationAreaComponent,canActivate:[AuthService]},
  {path:'login',component:LoginComponent},
  {path:"",component:HomeComponent,canActivate:[AuthService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

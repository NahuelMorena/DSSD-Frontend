import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormColeccionComponent } from './form-coleccion/form-coleccion.component';
import { EstablishMaterialsComponent } from './establish-materials/establish-materials.component';
import { ReserveMaterialsComponent } from './reserve-materials/reserve-materials.component';
import { ListTasksOperationAreaComponent } from './list-tasks-operation-area/list-tasks-operation-area.component';
import { DistributionOrderPlanningComponent } from './distribution-order-planning/distribution-order-planning.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth-service';
import { ListTasksCommercialAreaComponent } from './list-tasks-commercial-area/list-tasks-commercial-area.component';
import { ListTasksCommercialAreaLaunchCollectionsComponent } from './list-tasks-commercial-area-launch-collections/list-tasks-commercial-area-launch-collections.component';
import { MaterialsQueryApiComponent } from './materials-query-api/materials-query-api.component';
import { ListTasksQueryApiComponent } from './list-tasks-query-api/list-tasks-query-api.component';


const routes: Routes = [
  {path: 'crearColeccion',component:FormColeccionComponent,canActivate:[AuthService]},
  {path: 'establecerMateriales/:id/:idCase',component:EstablishMaterialsComponent,canActivate:[AuthService]},
  {path:'reservarMateriales',component:ReserveMaterialsComponent,canActivate:[AuthService]},
  {path:'listadoEstablecerMateriales',component:ListTasksOperationAreaComponent,canActivate:[AuthService]},
  {path:'listadoConsultarApi',component:ListTasksQueryApiComponent,canActivate:[AuthService]},
  {path:"consultaApi/:id/:idCase",component:MaterialsQueryApiComponent,canActivate:[AuthService]},
  {path:'login',component:LoginComponent},
  {path:"",component:HomeComponent,canActivate:[AuthService]},
  {path:'listadoPlanificarDistribucion',component:ListTasksCommercialAreaComponent,canActivate:[AuthService]},
  {path: 'planificarOrdenesDeDistribucion/:id/:idCase',component:DistributionOrderPlanningComponent,canActivate:[AuthService]},
  {path: 'listadoLanzarColeccionAlMercado', component:ListTasksCommercialAreaLaunchCollectionsComponent,canActivate:[AuthService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

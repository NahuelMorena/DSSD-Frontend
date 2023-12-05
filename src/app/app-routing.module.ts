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
import { StatisticsComponent } from './statistics/statistics.component';
import { ListTaskReserveProviderComponent } from './list-task-reserve-provider/list-task-reserve-provider.component';
import { ReserveSpaceComponent } from './reserve-space/reserve-space.component';
import { ListTasksOperationAreaReserveSpaceComponent } from './list-tasks-operation-area-reserve-space/list-tasks-operation-area-reserve-space.component';
import { ListTasksOperationAreaEvaluateCollectionComponent } from './list-tasks-operation-area-evaluate-collection/list-tasks-operation-area-evaluate-collection.component';
import { EvaluateCollectionComponent } from './evaluate-collection/evaluate-collection.component';


const routes: Routes = [
  {path: 'crearColeccion',component:FormColeccionComponent,canActivate:[AuthService]},
  {path: 'establecerMateriales/:id/:idCase',component:EstablishMaterialsComponent,canActivate:[AuthService]},
  {path:'reservarMateriales/:id/:idCase',component:ReserveMaterialsComponent,canActivate:[AuthService]},
  {path:'listadoEstablecerMateriales',component:ListTasksOperationAreaComponent,canActivate:[AuthService]},
  {path:'listadoConsultarApi',component:ListTasksQueryApiComponent,canActivate:[AuthService]},
  {path:"consultaApi/:id/:idCase",component:MaterialsQueryApiComponent,canActivate:[AuthService]},
  {path:'login',component:LoginComponent},
  {path:"",component:HomeComponent,canActivate:[AuthService]},
  {path:'listadoPlanificarDistribucion',component:ListTasksCommercialAreaComponent,canActivate:[AuthService]},
  {path: 'planificarOrdenesDeDistribucion/:id/:idCase',component:DistributionOrderPlanningComponent,canActivate:[AuthService]},
  {path: 'listadoLanzarColeccionAlMercado', component:ListTasksCommercialAreaLaunchCollectionsComponent,canActivate:[AuthService]},
  {path: 'estadisticas', component:StatisticsComponent,canActivate:[AuthService]},
  {path:'listadoReservaProveedor',component:ListTaskReserveProviderComponent,canActivate:[AuthService]},
  {path: 'listadoReservaEspacioDeFabricacion', component:ListTasksOperationAreaReserveSpaceComponent,canActivate:[AuthService]},
  {path: 'reservarEspacioDeFabricacion/:id/:idCase', component:ReserveSpaceComponent,canActivate:[AuthService]},
  {path: 'listadoValidarColeccion', component:ListTasksOperationAreaEvaluateCollectionComponent, canActivate:[AuthService]},
  {path: 'evaluarViabilidadDeColeccion/:id/:idCase', component:EvaluateCollectionComponent, canActivate:[AuthService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

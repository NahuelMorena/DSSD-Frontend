import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormColeccionComponent } from './form-coleccion/form-coleccion.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReserveMaterialsComponent } from './reserve-materials/reserve-materials.component';
import { EstablishMaterialsComponent } from './establish-materials/establish-materials.component';
import { MaterialService } from './services/material-service';
import { CollectionService } from './services/collection-service';
import { ListTasksOperationAreaComponent } from './list-tasks-operation-area/list-tasks-operation-area.component';
import { BonitaService } from './services/bonita-service';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth-service';
import { HomeComponent } from './home/home.component';
import { UserService } from './services/user-service';
import { NavbarComponent } from './navbar/navbar.component';
import { ListTasksCommercialAreaComponent } from './list-tasks-commercial-area/list-tasks-commercial-area.component';
import { DistributionOrderPlanningComponent } from './distribution-order-planning/distribution-order-planning.component';
import { StoreService } from './services/store-service';
import { ListTasksCommercialAreaLaunchCollectionsComponent } from './list-tasks-commercial-area-launch-collections/list-tasks-commercial-area-launch-collections.component';
import { MaterialsQueryApiComponent } from './materials-query-api/materials-query-api.component';
import { ListTasksQueryApiComponent } from './list-tasks-query-api/list-tasks-query-api.component';
import { DatePipe } from '@angular/common';
import { StatisticsComponent } from './statistics/statistics.component';
import { ListTaskReserveProviderComponent } from './list-task-reserve-provider/list-task-reserve-provider.component';
import { ReserveSpaceComponent } from './reserve-space/reserve-space.component';
import { ListTasksOperationAreaReserveSpaceComponent } from './list-tasks-operation-area-reserve-space/list-tasks-operation-area-reserve-space.component';
@NgModule({
  declarations: [
    AppComponent,
    FormColeccionComponent,
    ReserveMaterialsComponent,
    EstablishMaterialsComponent,
    ListTasksOperationAreaComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ListTasksCommercialAreaComponent,
    DistributionOrderPlanningComponent,
    ListTasksCommercialAreaLaunchCollectionsComponent,
    MaterialsQueryApiComponent,
    ListTasksQueryApiComponent,
    StatisticsComponent,
    ListTaskReserveProviderComponent,
    ReserveSpaceComponent,
    ListTasksOperationAreaReserveSpaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [MaterialService,CollectionService,BonitaService,AuthService,UserService,StoreService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

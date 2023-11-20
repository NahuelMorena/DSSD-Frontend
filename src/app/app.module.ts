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

@NgModule({
  declarations: [
    AppComponent,
    FormColeccionComponent,
    ReserveMaterialsComponent,
    EstablishMaterialsComponent,
    ListTasksOperationAreaComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [MaterialService,CollectionService,BonitaService,AuthService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

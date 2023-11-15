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

@NgModule({
  declarations: [
    AppComponent,
    FormColeccionComponent,
    ReserveMaterialsComponent,
    EstablishMaterialsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MaterialService,CollectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormColeccionComponent } from './form-coleccion/form-coleccion.component';
import { EstablishMaterialsComponent } from './establish-materials/establish-materials.component';
import { ReserveMaterialsComponent } from './reserve-materials/reserve-materials.component';


const routes: Routes = [
  /*{path:'',component:HomeComponent,canActivate:[AuthGuard]},*/
  {path: 'crearColeccion',component:FormColeccionComponent},
  {path: 'establecerMateriales',component:EstablishMaterialsComponent},
  {path:'reservarMateriales',component:ReserveMaterialsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

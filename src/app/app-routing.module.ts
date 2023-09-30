import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormColeccionComponent } from './form-coleccion/form-coleccion.component';


const routes: Routes = [
  /*{path:'',component:HomeComponent,canActivate:[AuthGuard]},*/
  {path: 'crearColeccion',component:FormColeccionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

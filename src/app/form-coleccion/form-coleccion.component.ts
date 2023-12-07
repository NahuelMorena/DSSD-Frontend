import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Furniture } from '../modelos/furniture';
import { FurnitureService } from '../services/furniture-service';
import { HttpErrorResponse } from '@angular/common/http';
import { CollectionDTO } from '../modelos/collection-dto';
import { CollectionService } from '../services/collection-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { GoogleDriveService } from '../services/drive-service';
import { TokenService } from '../services/token-service';

@Component({
  selector: 'app-form-coleccion',
  templateUrl: './form-coleccion.component.html',
  providers:[FurnitureService,CollectionService],
  styleUrls: ['./form-coleccion.component.css']
})
export class FormColeccionComponent {

  constructor(private furnitureService:FurnitureService,private collectionService:CollectionService,private router: Router,private authService:AuthService,private driveService:GoogleDriveService,
    private tokenService:TokenService){
    this.getMuebles()
  }
  furnitures:Furniture[]=[];
  collection=new CollectionDTO(null,null,null,0,"");
  submitted=false;
  existeGlobalFurniture=false;
  idFolderGlobalFurniture="";
  idCollectionFolder="";
  idCollection=-1;
  selectedFiles: File[] = [];
  onSubmit(form:NgForm){
    if (form.valid && this.collection.units > 0 && this.validateDates() && this.furnitures.length>0){
      this.collection.date_start_manufacture=form.value.date_start_manufacture;
      this.collection.date_end_manufacture=form.value.date_end_manufacture;
      this.collection.estimated_release_date=form.value.estimated_release_date
      this.collection.units=form.value.units;
      this.collection.mail=form.value.mail;
      this.submitted=true;
      this.createCollection();
    }
  }

  getMuebles(){
    this.furnitureService.getFurnitures().subscribe(
      (muebles)=>{
        this.furnitures=muebles;
      }
      ,(error:HttpErrorResponse)=>{
        if(error.status==401){
          this.authService.borrarEstadoPersistido();
          this.router.navigate(["/login"])
        }
        else if(error.status==403){
          this.router.navigate(["/"])
        }
      }
    );
    
  }

validateDates(): boolean {
  if(this.collection.date_start_manufacture!=null && this.collection.date_end_manufacture!=null && this.collection.estimated_release_date!=null){
    var startDate = new Date(this.collection.date_start_manufacture);
    var endDate = new Date(this.collection.date_end_manufacture);
    var estimatedDate = new Date(this.collection.estimated_release_date);

    if (startDate>new Date() && startDate < endDate && endDate < estimatedDate) {
      return true;
    } else {
      window.alert('Las fechas no cumplen las condiciones');
      return false;
    }
  }else{
    return false;
  }
}

  toggleSelection(furniture: Furniture) {
    const index = this.collection.furnitures.indexOf(furniture);
    if (index !== -1) {
      this.collection.furnitures.splice(index, 1);
    } else {
      this.collection.furnitures.push(furniture);
    }
    console.log(this.collection.furnitures);
  }

  createCollection():void{
    this.collectionService.createCollection(this.collection).subscribe(
      (response)=> {
        console.log(response);
        this.idCollection=response.id;
        window.alert("Coleccion creada exitosamente")
        this.driveActions();
      },
      (error:HttpErrorResponse)=>{
        console.error("Error al crear la colección ", error)
      }
    )
  }

  driveActions() {
    this.globalFurnitureExiste()
      .then(() => {
        if (!this.existeGlobalFurniture) {
          return this.crearCarpetaGlobalFurniture();
        } else {
          return Promise.resolve();
        }
      })
      .then(() => {
        return this.crearCarpetaColeccion().then(()=>{
          this.subirImagenes();
        })
      })
      .catch((error) => {
        console.error('Error en una de las acciones:', error);
      });
  }
  
  globalFurnitureExiste(): Promise<void> {
    return this.driveService.containsGlobalFurniture().toPromise()
      .then((response) => {
        this.existeGlobalFurniture = response.files.length === 1;
        if (this.existeGlobalFurniture) {
          this.idFolderGlobalFurniture = response.files[0].id;
        }
      })
      .catch((error) => {
        console.error('Error al verificar la existencia de GlobalFurniture:', error);
        throw error;
      });
  }
  
  crearCarpetaGlobalFurniture(): Promise<void> {
    return this.driveService.createFolderGlobalFurnitureIfNotExists().toPromise()
      .then((response) => {
        console.log('Carpeta creada:', response);
        this.idFolderGlobalFurniture = response.id;
      })
      .catch((error) => {
        console.error('Error al crear la carpeta:', error);
        throw error;
      });
  }
  
  crearCarpetaColeccion(): Promise<void> {
    return this.driveService.createFolderCollection(this.idFolderGlobalFurniture, "Collection" + this.idCollection).toPromise()
      .then((response) => {
        this.idCollectionFolder=response.id;
        console.log('Archivo creado:', response);
      })
      .catch((error) => {
        console.error('Error al crear el archivo:', error);
        throw error;
      });
  }

  onImageSelect(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      if(files[i].name.includes(".jpg")){
        this.selectedFiles.push(files[i]);
      }
    }
  }

  deleteMaterial(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  subirImagenes(){
    for(var file of this.selectedFiles){
      this.driveService.createImageFileInFolder(this.idCollectionFolder,file).subscribe(
        (response)=>{
          console.log(response);
        }
      )
    }
  }
}

import { Component } from '@angular/core';
import { GoogleDriveService } from '../services/drive-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-prueba-drive',
  templateUrl: './prueba-drive.component.html',
  styleUrls: ['./prueba-drive.component.css']
})
export class PruebaDriveComponent {
  folderGlobalFurnitureId="";

  constructor(private driveService:GoogleDriveService){

  }
 authenticate(){
  this.driveService.authenticate();
 }

 getFiles(){
  var ok=false;
  this.driveService.containsGlobalFurniture().subscribe(
    (response)=>{
      if(response.files.length==1){
        this.folderGlobalFurnitureId=response.files[0].id;
      }else{
        ok=false;
      }
    }
  )

 }

crearCarpetaEnGlobalFurniture(){
  this.driveService.createFolderCollection(this.folderGlobalFurnitureId,"Collection1")
 }


}

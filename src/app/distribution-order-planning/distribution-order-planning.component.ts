import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CollectionService } from '../services/collection-service';
import { AuthService } from '../services/auth-service';
import { StoreService } from '../services/store-service';
import { Store } from '../modelos/store';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderDto } from '../modelos/orderdto';
import { OrderRequestDto } from '../modelos/order-request-dto';
import { Collection } from '../modelos/collection';

@Component({
  selector: 'app-distribution-order-planning',
  templateUrl: './distribution-order-planning.component.html',
  styleUrls: ['./distribution-order-planning.component.css']
})
export class DistributionOrderPlanningComponent {

  constructor(private collectionService:CollectionService,private storeService:StoreService,private activatedRoute: ActivatedRoute,
    private router:Router,private authService:AuthService){
      this.getStores();
      this.activatedRoute.params.subscribe(params=>{
        this.collectionId = params["id"];
        this.idCase = params["idCase"];
        if(this.collectionId != -1){
          collectionService.getByID(this.collectionId).subscribe(
            (response)=>{
              this.units = response.units;
            },
            (error:HttpErrorResponse)=>{
              console.log(error);
              window.alert("Ocurrio un error al buscar colección");
            }
          )
          console.log("ID de la colección es ",this.collectionId);
          console.log("ID del caso es ", this.idCase);
        }
      })
    }
  collectionId:number=-1;
  idCase:number=-1;
  stores:Store[]=[];
  selectedStores:OrderDto[]=[]
  store:Store=new Store(-1,"","","");
  quantity=0;
  units:number=-1
  onSubmit(form:NgForm){
    if(form.valid){
      this.confirmOrders();
    }
  }

  getStores(){
    this.storeService.getStores().subscribe(
      (stores)=>{
        this.stores=stores;
        if(this.stores.length>0){
          this.store=this.stores[0];
        }
      }
      ,(error:HttpErrorResponse)=>{
        if(error.status==401){
          this.authService.borrarEstadoPersistido()
          this.router.navigate(["/login"])
        }
        else if(error.status==403){
          this.router.navigate(["/"])
        }
      }
    );
  } 

  addOrder(): void {
    if(this.quantity>0 && this.quantity <= this.units){
      var existingStore=this.selectedStores.find(obj => obj.id_store === this.store.id);
      if(existingStore){
        existingStore.quantity=existingStore.quantity+this.quantity;
      } else {
        var s = new OrderDto(this.store.id,this.quantity);
        this.selectedStores.push(s);
      }
      this.units -= this.quantity;
      console.log("valor de units:",this.units);
    } else {
      window.alert("Se deben elegir desde 1 a la cantidad de unidades disponibles de la colección");
    }
  }

  deleteStore(index:number): void {
    const deleted = this.selectedStores[index];
    this.units += deleted.quantity;
    this.selectedStores.splice(index, 1);
  }

  confirmOrders(){
    console.log(this.selectedStores);
    if(this.selectedStores.length > 0 && this.collectionId!=-1){
      let orderRequest = new OrderRequestDto(this.collectionId,this.selectedStores,this.idCase);
      this.collectionService.setDistributionOrder(orderRequest).subscribe(
        (response)=>{
          this.router.navigate(["/"])
        },
        (error:HttpErrorResponse)=>{
          console.log(error);
          window.alert("Ocurrio un error al establecer ordenes de distribución");
        }
      )
    }
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "../modelos/store";

@Injectable()
export class StoreService {
    private url='http://localhost:8080/api/stores'
    constructor(private http: HttpClient) {}

    public getStores():Observable<Store[]> {
        return this.http.get<Store[]>(this.url+"/get-stores",{withCredentials:true});
    }
}
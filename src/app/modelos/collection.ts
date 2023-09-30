import { Category } from "./category";
import { Furniture } from "./furniture";

export class Collection {
    public id: number;
    public furnitures: Furniture[]=[]
    public date_start_manufacture: Date;
    public date_end_manufacture: Date;
    public estimated_release_date: Date;
    public detalleMateriales: string;

    constructor(id: number, date_start_manufacture: Date, date_end_manufacture: Date, estimated_release_date: Date,detalle:string) {
        this.id = id;
        this.date_start_manufacture = date_start_manufacture;
        this.date_end_manufacture = date_end_manufacture;
        this.estimated_release_date = estimated_release_date;
        this.detalleMateriales=detalle;
    }
}


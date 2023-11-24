import { Furniture } from "./furniture";
import { FurnitureInCollection } from "./furniture-in-collection";

export class Collection {
    public id: number;
    public date_start_manufacture: Date;
    public date_end_manufacture: Date;
    public estimated_release_date: Date;
    public units:number;
    public furnitures:FurnitureInCollection[]=[]

    constructor(id: number, date_start_manufacture: Date, date_end_manufacture: Date, estimated_release_date: Date, units:number) {
        this.id = id;
        this.date_start_manufacture = date_start_manufacture;
        this.date_end_manufacture = date_end_manufacture;
        this.estimated_release_date = estimated_release_date;
        this.units=units;
    }
}


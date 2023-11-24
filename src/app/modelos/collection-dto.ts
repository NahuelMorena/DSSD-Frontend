import { Furniture } from "./furniture";

export class CollectionDTO {
    public furnitures: Furniture[]=[]
    public date_start_manufacture: Date | null;
    public date_end_manufacture: Date | null;
    public estimated_release_date: Date | null;
    public units:number;

    constructor(date_start_manufacture: Date | null, date_end_manufacture: Date | null, estimated_release_date: Date | null,units:number) {
        this.date_start_manufacture = date_start_manufacture;
        this.date_end_manufacture = date_end_manufacture;
        this.estimated_release_date = estimated_release_date;
        this.units=units;
    }
}

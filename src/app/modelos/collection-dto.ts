import { Furniture } from "./furniture";

export class CollectionDTO {
    public furnitures: Furniture[]=[]
    public date_start_manufacture: Date;
    public date_end_manufacture: Date;
    public estimated_release_date: Date;

    constructor(date_start_manufacture: Date, date_end_manufacture: Date, estimated_release_date: Date) {
        this.date_start_manufacture = date_start_manufacture;
        this.date_end_manufacture = date_end_manufacture;
        this.estimated_release_date = estimated_release_date;
    }
}

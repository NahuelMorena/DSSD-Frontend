import { Category } from "./category";
import { FurnitureInCollection } from "./furniture-in-collection";

export class Furniture {
    public id:number;
    public model_name:string;
    public description:string;
    public category:Category;
    public collections:FurnitureInCollection[]=[]

    constructor(id:number,model_name:string,description:string,category:Category){
        this.id=id;
        this.model_name=model_name;
        this.description=description;
        this.category=category;
    }
}

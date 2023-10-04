import { Collection } from "./collection";
import { Furniture } from "./furniture";

export class FurnitureInCollection {
    public id:number;
    public furniture:Furniture;
    public collection:Collection;

    constructor(id:number,furniture:Furniture,collection:Collection){
        this.id=id;
        this.furniture=furniture;
        this.collection=collection;
    }
}

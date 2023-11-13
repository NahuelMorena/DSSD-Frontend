import { MaterialDto } from "./materialdto";

export class MaterialRequestDto{
    public collection_id:number;
    public materials:MaterialDto[]

    constructor(collection_id:number,materials:MaterialDto[]){
        this.collection_id=collection_id;
        this.materials=materials;
    }
}

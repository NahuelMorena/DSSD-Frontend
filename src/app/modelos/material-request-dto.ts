import { MaterialDto } from "./materialdto";

export class MaterialRequestDto{
    public collection_id:number;
    public materials:MaterialDto[]
    public process_instance_id:number;

    constructor(collection_id:number,materials:MaterialDto[], idCase:number){
        this.collection_id=collection_id;
        this.materials=materials;
        this.process_instance_id=idCase;
    }
}

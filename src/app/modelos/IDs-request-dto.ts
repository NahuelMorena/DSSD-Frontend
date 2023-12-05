
export class IDsRequestDto{
    public collection_id:number;
    public process_instance_id:number;

    constructor(collection_id:number, idCase:number){
        this.collection_id=collection_id;
        this.process_instance_id=idCase;
    }
}

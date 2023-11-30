export class DateSpaceRequestDto{
    public collection_id:number;
    public dateSpace_id:number;
    public process_instance_id:number;

    constructor(collection_id:number,dateSpace_id:number, idCase:number){
        this.collection_id=collection_id;
        this.dateSpace_id=dateSpace_id;
        this.process_instance_id=idCase;
    }
}
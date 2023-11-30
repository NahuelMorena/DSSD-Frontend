import { OrderDto } from "./orderdto";

export class OrderRequestDto{
    public collection_id:number;
    public orders:OrderDto[]
    public process_instance_id:number;

    constructor(collection_id:number,orders:OrderDto[], idCase:number){
        this.collection_id=collection_id;
        this.orders=orders;
        this.process_instance_id=idCase;
    }
}

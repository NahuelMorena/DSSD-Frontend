export class OrderDto {
    public id_store:number;
    public quantity:number;

    constructor(id_store:number,quantity:number){
        this.id_store=id_store;
        this.quantity=quantity;
    }
}

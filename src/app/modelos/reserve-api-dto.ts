export class ReserveByApiDTO {
    id: number;
    quantity: number;
    delivery_date: string;
    number_of_rescheduling: number;
    collectionId: number;
  
    constructor(
      id: number,
      quantity: number,
      delivery_date: string,
      number_of_rescheduling: number,
      collectionId: number
    ) {
      this.id = id;
      this.quantity = quantity;
      this.delivery_date = delivery_date;
      this.number_of_rescheduling = number_of_rescheduling;
      this.collectionId = collectionId;
    }
  }
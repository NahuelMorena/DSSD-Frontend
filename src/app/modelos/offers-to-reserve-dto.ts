import { Offer } from "./offer";

export class OffersToReserveDTO{
    public offers:Offer[];

    constructor(offers:Offer[]){
        this.offers=offers;
    }
}
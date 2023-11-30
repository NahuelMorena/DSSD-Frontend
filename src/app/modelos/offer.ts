export class Offer {
    public idProviderOfferMaterial:number;
    public quantity:number;
    public nameMaterial:string;

    constructor(idProviderOfferMaterial:number,quantity:number,nameMaterial:string){
        this.idProviderOfferMaterial=idProviderOfferMaterial;
        this.quantity=quantity;
        this.nameMaterial=nameMaterial;
    }
}

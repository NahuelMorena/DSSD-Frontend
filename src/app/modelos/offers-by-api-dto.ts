import { MaterialDto } from "./materialdto";
import { ProviderApiDTO } from "./provider-api-dto";

export class OffersByApiDTO {
    public id:number;
    public quantity_available:number;
    public delivery_date_available:string;
    public price_by_unit:number;
    public provider:ProviderApiDTO;
    public material: MaterialDto

    constructor(id:number,quantity_available:number,delivery_date_available:string,price_by_unit:number,provider:ProviderApiDTO,material:MaterialDto){
        this.id=id;
        this.quantity_available=quantity_available;
        this.delivery_date_available=delivery_date_available;
        this.price_by_unit=price_by_unit;
        this.provider=provider;
        this.material=material;
    }

}

import { ProviderApiDTO } from "../modelos/provider-api-dto";

interface MaterialApiDTO {
    id: number;
    name: string;
  } 
  
  interface ReserveByApiDTO {
    id: number;
    quantity: number;
    delivery_date: string;
    number_of_rescheduling: number;
    material: MaterialApiDTO;
    provider: ProviderApiDTO;
  }

  interface ManufacturingSpace {
    id: number;
    name: string;
    direction: string;
    price_per_day: number;
    phone: string;
    email: string;
  }

export interface DateSpace {
    id: number;
    available_from: string;
    available_until: string;
    reserved: boolean;
    reserves: ReserveByApiDTO[];
    manufacturingSpace: ManufacturingSpace;
}
import { Categoria } from "./categoria";
import { Mueble } from "./mueble";

export class Coleccion {
    public id: number;
    public muebles: Mueble[]=[]
    public fechaInicioFabricacion: Date;
    public fechaFinFabricacion: Date;
    public fechaLanzamientoEstimada: Date;

    constructor(id: number, fechaInicioFabricacion: Date, fechaFinFabricacion: Date, fechaLanzamientoEstimada: Date) {
        this.id = id;
        this.fechaInicioFabricacion = fechaInicioFabricacion;
        this.fechaFinFabricacion = fechaFinFabricacion;
        this.fechaLanzamientoEstimada = fechaLanzamientoEstimada;
    }
}


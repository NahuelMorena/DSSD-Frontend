import { Categoria } from "./categoria";

export class Mueble {
    public id:number;
    public modelo:string;
    public descripcion:string;
    public categoria:Categoria;

    constructor(id:number,modelo:string,descripcion:string,categoria:Categoria){
        this.id=id;
        this.modelo=modelo;
        this.descripcion=descripcion;
        this.categoria=categoria;
    }
}

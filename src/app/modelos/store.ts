export class Store {
    public id:number;
    public name:string;
    public direction:string;
    public location:string;

    constructor(id:number,name:string,direction:string,location:string){
        this.name=name;
        this.direction=direction;
        this.location=location;
        this.id=id;
    }
}

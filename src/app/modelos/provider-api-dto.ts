export class ProviderApiDTO {
    public id:number;
    public role:string;
    public name:string;
    public phone:string;
    public email:string;

    constructor(id:number,role:string,name:string,phone:string,email:string){
        this.id=id;
        this.role=role;
        this.name=name;
        this.phone=phone;
        this.email=email;
    }
}

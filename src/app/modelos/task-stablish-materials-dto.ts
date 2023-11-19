export class TaskStablishMaterialsDTO {
    public id:number;
    public idCase:number;
    public name:String;
    public idCollection:number;
    public date_start_manufacture:Date;
    public date_end_manufacture:Date;
    public estimated_release_date:Date;

    constructor(id:number,idCase:number,name:String,idCollection:number,date_start_manufacture:Date,date_end_manufacture:Date,estimated_release_date:Date){
        this.id=id;
        this.idCase=idCase;
        this.name=name;
        this.idCollection=idCollection;
        this.date_start_manufacture=date_start_manufacture;
        this.date_end_manufacture=date_end_manufacture;
        this.estimated_release_date=estimated_release_date;
    }
}

export class ArchivedCaseDTO {
    public id:number;
    public rootCaseId:number;
    public state:string;
    public start:Date;
    public startedBy:number;
    public end_date:Date;
    public last_update_date:Date;
    public archivedDate:Date;

    constructor(id:number,rootCaseId:number,state:string,start:Date,startedBy:number,end_date:Date,last_update_date:Date,archivedDate:Date){
        this.id=id;
        this.rootCaseId=rootCaseId;
        this.state=state;
        this.start=start;
        this.startedBy=startedBy;
        this.end_date=end_date;
        this.last_update_date=last_update_date;
        this.archivedDate=archivedDate;
    }

}

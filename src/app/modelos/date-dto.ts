export class DateDto{
    public available_from:string | null;
    public available_until:string | null;

    constructor(from:string, until:string){
        this.available_from=from;
        this.available_until=until;
    }
}

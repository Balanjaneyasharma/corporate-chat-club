export interface Club{
    id : number,
    name : string,
    description : string,
    createdBy :string,
    createdOn : Date,
    isPublic : boolean,
    isAdmin:boolean,
    type : boolean,
    deactivatedBy : string,
    deactivatedOn : Date,
    reason :string,
}
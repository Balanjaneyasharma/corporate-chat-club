export interface Club{
    clubId ?: number,
    name : string,
    profileImageUrl : string,
    description : string,
    createdOn? : Date,
    clubCreatedBy : string,
    participants : number,
    isPublic : boolean,
    type : boolean,
    requestStatus :boolean,
    isAdmin : boolean,
    status : boolean;    
}
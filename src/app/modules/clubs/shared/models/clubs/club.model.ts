export interface Club{
    clubId ?: number,
    name : string,
    profileImageUrl : string,
    description : string,
    createdOn? : Date,
    createdBy : string,
    participants : number,
    isPublic : boolean,
    type : boolean,
    requestStatus :boolean,
    isAdmin : boolean,
    status : boolean;
    clubType ? : string,
    clubStatus ? : string   
}


export interface TaggesUsers{
    id:number,
    displayName:string,
    email:string,
    profileImageUrl:string
}


export class AddClub{
    name : string;
    profileImageUrl : string;
    description : string;
    clubCreatedBy : number | null | string;
    isPublic : boolean;
    type : boolean;
    clubAdmins : Array<number>;
    clubMembers : Array<number>;
    constructor(args:AddClub){
        this.name = args.name;
        this.profileImageUrl = args.profileImageUrl;
        this.description = args.description;
        this.clubCreatedBy = this.clubCreatedBy;
        this.isPublic = args.isPublic;
        this.type = args.type;
        this.clubAdmins = args.clubAdmins
        this.clubMembers = args.clubMembers
    }
}
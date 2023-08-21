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
export class Participant{
    userId:number;
    clubId ?: number;
    displayName : string;
    email : string;
    profileImageUrl : string;
    status : boolean;
    isAdmin : boolean
    constructor(args:Participant){
        this.userId = args.userId;
        this.clubId = args.clubId;
        this.displayName = args.displayName;
        this.email = args.email;
        this.profileImageUrl = args.profileImageUrl;
        this.status= args.status;
        this.isAdmin = args.isAdmin
    }
}
// export interface participant{
//     userId:number,
//     clubId : number,
//     displayName : string,
//     email : string,
//     profileImageUrl : string,
//     status : boolean,
//     isAdmin : boolean
// }
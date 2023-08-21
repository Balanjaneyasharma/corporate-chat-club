import { Participant, Requests } from "..";


export class ClubInfo{
    id : number;
    name : string;
    description : string;
    displayName : string;
    createdOn : Date;
    participants : number;
    isAdmin:boolean;
    isPublic:boolean;
    type:boolean;
    profileImageUrl:string;
    allParticipants:Participant[];
    clubRequests:Requests[];
    constructor(args:ClubInfo){
       this.id = args.id,
       this.name = args.name,
       this.description = args.description,
       this.displayName = args.displayName,
       this.createdOn = args.createdOn,
       this.participants = args.participants,
       this.isAdmin = args.isAdmin,
       this.isPublic = args.isPublic,
       this.type = args.type,
       this.profileImageUrl = args.profileImageUrl,
       this.allParticipants = args.allParticipants,
       this.clubRequests = args.clubRequests
    }
}

export interface NewUsers{
    id:number,
    displayName:string,
    jobTitle:string,
    profileImageUrl:string
}
export interface User{
    id : number,
    displayName : string,
    email : string,
    phoneNumber:number,
    addedBy:string,
    addedOn:Date,
    status:string,
    role:boolean,
    activeClubs:number,
    adminCount:number
}


export class NewUser {
    id ?: number;
    firstName : string;
    middleName : string;
    lastName : string;
    displayName : string;
    profileImageUrl ?: string;
    email : string | number ;
    phoneNumber : number;
    jobTitle : string;
    invitationStatus : number;
    clubs ?: Array<number>;
    addedBy : number;

    constructor(args : NewUser){
        this.firstName = args.firstName;
        this.middleName = args.middleName;
        this.lastName = args.lastName;
        this.displayName = args.displayName;
        this.email = args.email;
        this.phoneNumber = args.phoneNumber;
        this.jobTitle = args.jobTitle;
        this.invitationStatus = args.invitationStatus;
        this.clubs = args.clubs;
        this.addedBy = args.addedBy;
    }
}
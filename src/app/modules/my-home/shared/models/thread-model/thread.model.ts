export interface Thread{
    receiverId : number,
    receiverDisplayName : string,
    profileImageUrl: string
    lastMessage : string,
    isAttachmentsPresent : boolean,
    lastMessageSenderId : number,
    postedOn : Date,
    unReadCount:number,
    isFavourite:boolean,
    isNotificationMuted:boolean,
    invitedBy : number,
    status : Status;
    blockedBy :number
}

export enum Status {
    Blocked,
    Accepted,
    Pending
}

export class ThreadInfo{
    info : Info;
    names : Array<string>;
    
    constructor(args:ThreadInfo){
        this.info = args.info;
        this.names = args.names
    }
}


export class Info {
    email : string;
    phoneNumber: number;
    commonClubs: number;
    constructor(args:Info){
      this.email = args.email,
      this.phoneNumber = args.phoneNumber,
      this.commonClubs = args.commonClubs
    }
}
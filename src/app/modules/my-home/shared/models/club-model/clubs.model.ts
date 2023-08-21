export interface Club{
    clubId : number,
    name : string,
    lastMessageDisplayName : string,
    lastMessage : string,
    postedOn : Date,
    isFavourite : boolean,
    isNotificationsMuted:boolean,
    isAttachmentsPresent : boolean,
    senderId : number,
    unReadCount : number,
    profileImageUrl:string,
    status : boolean
    // isAdmin:boolean,
}



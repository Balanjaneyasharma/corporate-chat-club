export interface ClubMessages{
    content : string,
    clubId?:number,
    displayName : string,
    postedOn:Date,
    attachments ?: Attachment [],
}

export interface Attachment {
    name : string ,
    url : string
}



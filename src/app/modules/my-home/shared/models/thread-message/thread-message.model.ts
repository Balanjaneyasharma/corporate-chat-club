export interface ThreadMessage{
    senderId: number,
    receiverId : number,
    senderDisplayName : string,
    profileImageUrl : string | null,
    content : string,
    postedOn : Date,
    attachments ?: Attachments[]
}
export interface Attachments{
    name : string,
    url : string
}

export interface ChatUpdateLogs{
    name:string;
    actionPerformedBy:number;
    actionPerformedByName:string;
    actionPerformedOnName:string;
    postedOn:Date;
    messageType:MessageTypes;
    isChatUpdateLog:boolean;
}

export enum MessageTypes {
 ClubDetails=0,
 UsersAdded=1,
 AddedAsAdmin=2,
 RemovedAsAdmin=3,
 BlockUser=4,
 UnBlockUser=5,
 Leave=6,
 ClubDeactivated=7,
 ClubReactivated=8,
 ClubCreated=9
};
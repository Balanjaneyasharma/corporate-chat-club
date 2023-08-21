import { ClubMessages } from "..";
import { ChatUpdateLogs } from "../chat-update-logs";

export interface ClubDetails {
    clubMessages: Array<ClubMessages>;
    updateLogs : Array<ChatUpdateLogs>;
    status : boolean;
}
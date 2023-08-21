import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AuthServiceService } from 'src/app/core';
import { environment } from 'src/environments/environment';
import { MessageServiceService } from '..';
import { ThreadMessage, ThreadMessagesService } from '../..';

@Injectable({
  providedIn: 'root'
})
export class SignalRConnectService {

  private hubConnection : signalR.HubConnection;

  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  currentEnvironment : string = environment.apiLink;



  constructor(private authService : AuthServiceService, private threadMessagesService : ThreadMessagesService,private clubMessages : MessageServiceService) { }

  public startConnection = ( ) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.currentEnvironment}/chats`,{
        headers:{'Authorization':`bearer ${this.authService.getToken()}`}})
        .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.None)
      .build();

    this.hubConnection.start()
      .then(() =>{ 
        console.log('Connection started');
        this.threadMessagesService.ReceiveThreadMessages(this.hubConnection);
        // this.clubMessages.receiveClubMessages(this.hubConnection);
      })
      .catch(err => console.log('Error while starting connection: ' + err));

    this.hubConnection.onclose(()=>{
      console.log("Disconnected");
      
    })
  }
}

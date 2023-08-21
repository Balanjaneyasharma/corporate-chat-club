import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Thread, ThreadMessage } from '../..';
import { BehaviorSubject } from 'rxjs';
import { AuthServiceService } from 'src/app/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ThreadMessagesService {

  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  public fileHeaders = new HttpHeaders();
  private messagesData : ThreadMessage[]=[];
  private hubConnection ;
  currentEnvironment : string = environment.apiLink;
  private  threadMessages$ = new BehaviorSubject<ThreadMessage[]>([]);

  constructor(private http : HttpClient, private authService : AuthServiceService) { }

  getThreadMessagesObservable(){
    return this.threadMessages$.asObservable();
  }

  updateThreadMessageObservable(threadMessages : ThreadMessage[]){
    this.messagesData = threadMessages;
    this.threadMessages$.next(this.messagesData);
  }

  updateThreadSingleMEssage(message : ThreadMessage){
    this.messagesData.push(message);    
    this.threadMessages$.next(this.messagesData);
  }



  public ReceiveThreadMessages = (hubConnection) => {
    this.hubConnection = hubConnection;
    this.hubConnection.on('ReceiveThreadMessage', (data) => {
      this.updateThreadSingleMEssage(data); // server - client
      console.log('on success thread',data);
    });

  }

  invokeServer(message : ThreadMessage){
    this.hubConnection.invoke('SendThreadMessage' , message)
    .then(()=>{    
      console.log('invoke success from thread');  // client - server
    })
    .catch(err => console.log(err)
    );

  }

  fetchThreadMessages(id:number){
    return this.http.get<ThreadMessage[]>(`${this.currentEnvironment}/api/threads/${id}/messages`,{headers:this.headers});
  }

  threadInfo(id:number){
    return this.http.get(`${this.currentEnvironment}/api/threads/${id}/info`,{headers:this.headers});
  }

  updateToFavorite(id:number,selectedChat:Thread){
    console.log('updating to favourites');
    return this.http.patch(`${this.currentEnvironment}/api/threads/${id}/add/favourite`,{},{headers:this.headers});
  }

  RemoveFromFavourite(id:number,selectedChat:Thread){
    return this.http.patch(`${this.currentEnvironment}/api/threads/${id}/remove/favourite`,{},{headers:this.headers});
  }

  blockUser(id:number){
    return this.http.patch(`${this.currentEnvironment}/api/threads/${id}/block`,{},{headers:this.headers});
  }

  UnBlockUser(id:number){
    return this.http.patch(`${this.currentEnvironment}/api/threads/${id}/unblock`,{},{headers:this.headers});
  }
  connectToUser(id:number){
    return this.http.patch(`${this.currentEnvironment}/api/threads/${id}/connect`,{},{headers:this.headers});
  }

  postThreadMessage(id : number , message:FormData){
    return this.http.post(`${this.currentEnvironment}/api/threads/${id}/message`,message,{headers:this.fileHeaders});
  }


}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClubDetails, ClubMessages } from '../..';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class MessageServiceService {

  constructor(private http : HttpClient ) {}


  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  public  fileHeaders = new HttpHeaders();

  public clubMessages$  = new  BehaviorSubject<ClubDetails>(null);
  private hubConnection ;

  currentEnvironment : string = environment.apiLink;


  previousDate = new Date();

  updateDate(){
    this.previousDate.setDate(this.previousDate.getDate() - 1);
  }

  getClubMessageObservable(){
    return this.clubMessages$.asObservable();
  }
   
  private clubDetails : ClubDetails = null;



  fetchClubMessages(id:number){
     return this.http.get<ClubDetails>(`${this.currentEnvironment}/api/clubs/${id}/messages`,{headers:this.headers});
  }

  updateClubMesssageObservable(clubChat : ClubDetails){
    this.clubDetails = clubChat;
    this.clubMessages$.next(this.clubDetails);
  }

  updateClubMessages(message ){
    this.clubDetails.clubMessages.push(message);
    this.clubMessages$.next(this.clubDetails);
  }

  public receiveClubMessages = (hubConnection) => {
    this.hubConnection = hubConnection;
    this.hubConnection.on('ReceiveClubMessage', (data) => {
      this.updateClubMessages(data); // server - client
      console.log('on success club',data);
    });

  }

  invokeServer(message : ClubMessages , clubId : number){
    this.hubConnection.invoke('SendClubMessage' , message,clubId)
    .then(()=>{    
      console.log('invoke success from club');  // client - server
    })
    .catch(err => console.log(err)
    );
  }
  postClubMessage(id : number ,message:FormData){
    return this.http.post<ClubMessages[]>(`${this.currentEnvironment}/api/clubs/${id}/message`,message,{headers:this.fileHeaders});
  }




}

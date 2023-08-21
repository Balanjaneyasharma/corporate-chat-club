import { Injectable } from '@angular/core';
import { Club } from '../..';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from 'src/app/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClubService {
  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  private clubData : Club[]=[]
  private clubData$= new BehaviorSubject<Club[]>([]);
  currentEnvironment : string = environment.apiLink;

  constructor(private http : HttpClient , private authService : AuthServiceService) {}


  updateToObservable(response:Club[]) {
    this.clubData = response;
    this.clubData$.next(response);
  }

  fetchClubList(){
    return this.http.get<Club[]>(`${this.currentEnvironment}/api/users/me/clubdetails`,{headers:this.headers});
  }
  
  getClubName(id : number){
    let required = this.clubData.find((ele)=>ele.clubId === id);
    return required.name;

  }

  getClubDataObservable(){
    return this.clubData$.asObservable();
  }

  updateClub(id:number,lastMessage:string,postedOn:Date,user : string)
  {
    const required = this.clubData.find((ele)=>ele.clubId === id);
    required.lastMessage=lastMessage;
    required.postedOn=postedOn;
    required.lastMessageDisplayName=user;
    this.clubData$.next(this.clubData);
  }

  getSingleClub(id:number) : Club{
    return this.clubData.find((ele)=>ele.clubId === id);
  }

  updateToFavorite(id:number,selectedChat:Club){
    return this.http.patch(`${this.currentEnvironment}/api/clubs/${id}/user/add/favourite`,selectedChat,{headers:this.headers});
  }

  RemoveFromFavourite(id:number,selectedChat:Club){
    return this.http.patch(`${this.currentEnvironment}/api/clubs/${id}/user/remove/favourite`,selectedChat,{headers:this.headers});
  }

  MuteClub(id:number){
    return this.http.patch(`${this.currentEnvironment}/api/clubs/${id}/user/mute`,{},{headers:this.headers});
  }

  UnmuteClub(id:number){
    return this.http.patch(`${this.currentEnvironment}/api/clubs/${id}/user/unmute`,{},{headers:this.headers});   
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ClubInfo, NewUsers } from '../..';

@Injectable({
  providedIn: 'root'
})

export class ClubinfoService {

  constructor(private http: HttpClient) { }


  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  private clubDetails: ClubInfo[] = [];

  clubDetails$= new BehaviorSubject<ClubInfo[]>([]);

  currentEnvironment : string = environment.apiLink;



  getClubDetailsObservable(){
    return this.clubDetails$.asObservable();
  }

  updateToObservable(response:ClubInfo[]) {
      this.clubDetails = response;
      this.clubDetails$.next(response);
    }

  fetchClubDetails(id: number) {
    return this.http.get<ClubInfo[]>(`${this.currentEnvironment}/api/clubs/${id}/info`,{headers:this.headers});
  }

  removeAdmin(userId:number , clubId:number){
    return this.http.patch(`${this.currentEnvironment}/api/clubs/${clubId}/users/${userId}/remove/admin`,{},{headers:this.headers});
  }
  
  blockUser(userId:number , clubId:number){
    return this.http.patch(`${this.currentEnvironment}/api/clubs/${clubId}/users/${userId}/block`,{},{headers:this.headers});
  }

  makeAdmin(userId:number , clubId:number){
    return this.http.patch(`${this.currentEnvironment}/api/clubs/${clubId}/users/${userId}/add/admin`,{},{headers:this.headers});
  }
  
  unblockUser(userId:number , clubId:number){
    return this.http.patch(`${this.currentEnvironment}/api/clubs/${clubId}/users/${userId}/unblock`,{},{headers:this.headers});
  }

  deleteRequest(userId:number,clubId:number){
    return this.http.delete(`${this.currentEnvironment}/api/clubs/${clubId}/users/${userId}/request`,{headers:this.headers});
  }

  acceptRequest(userId:number , clubId:number){
    return this.http.post(`${this.currentEnvironment}/api/clubs/${clubId}/users/${userId}/request`, {},{headers:this.headers});
  }

  getNewUsers(clubId:number){
    return this.http.get<NewUsers[]>(`${this.currentEnvironment}/api/clubs/${clubId}/newusers`,{headers:this.headers});
  }

  addNewUsers(clubId:number,userIdList){
    return this.http.post(`${this.currentEnvironment}/api/clubs/${clubId}/users`,{participants : userIdList},{headers:this.headers})
  }

  exitClub(clubId:number){
    console.log(clubId);
     return this.http.patch(`${this.currentEnvironment}/api/clubs/${clubId}/user/exit`,{},{headers:this.headers});
  }

  deActiveClub(clubId:number,reason){
    return this.http.patch(`${this.currentEnvironment}/api/clubs/${clubId}/deactivate`,{Reason:reason},{headers:this.headers});
  }

  reActivateClub(clubId:number,reason){
    return this.http.patch(`${this.currentEnvironment}/api/clubs/${clubId}/reactivate`,{Reason:reason},{headers:this.headers});
  }

  makeClubPublic(clubId:number){
    return this.http.patch(`${this.currentEnvironment}/api/clubs/${clubId}/make/public`,{},{headers:this.headers});
  }

  makeClubPrivate(clubId:number){
    return this.http.patch(`${this.currentEnvironment}/api/clubs/${clubId}/make/private`,{},{headers:this.headers});
  }

  makeClubOpen(clubId:number){
     return this.http.patch(`${this.currentEnvironment}/api/clubs/${clubId}/make/open`,{},{headers:this.headers});
  }

  makeClubClosed(clubId:number){
     return this.http.patch(`${this.currentEnvironment}/api/clubs/${clubId}/make/closed`,{},{headers:this.headers});
  }

}


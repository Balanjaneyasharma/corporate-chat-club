import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddClub, Club, TaggesUsers } from '../..';

@Injectable({
  providedIn: 'root'
})
export class ClubServiceService {

  constructor(private http: HttpClient) { }

  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  private clubData: Club[] = []

  clubDetails$= new BehaviorSubject<Club[]>([]);

  currentEnvironment : string = environment.apiLink;



  getClubDetailsObservable(){
    return this.clubDetails$.asObservable();
  }

  updateToObservable(response:Club[]) {
      this.clubData = response;
      this.clubDetails$.next(response);
    }

  fetchClubData() {
    return this.http.get<Club[]>(`${this.currentEnvironment}/api/clubs`,{headers:this.headers});
  }

  joinClub(clubId:number){
    return this.http.post<Club[]>(`${this.currentEnvironment}/api/clubs/${clubId}/join`,{},{headers:this.headers});
  }

  makeRequestToClub(clubId:number){
    return this.http.post<Club[]>(`${this.currentEnvironment}/api/clubs/${clubId}/user/send/request`,{},{headers:this.headers});
  }

  cancelRequestToClub(clubId:number){
    return this.http.patch<Club[]>(`${this.currentEnvironment}/api/clubs/${clubId}/user/cancel/request`,{},{headers:this.headers});
  }

  
  deActivateClub(clubId:number,reason){
    return this.http.patch(`${this.currentEnvironment}/api/clubs/${clubId}/deactivate`,{Reason:reason},{headers:this.headers});
  }
  

  reportClub(clubId:number,reason){
    return this.http.patch(`${this.currentEnvironment}/api/clubs/${clubId}/report`,{Reason:reason},{headers:this.headers});
  }

  getAllUsers(){
    return this.http.get<TaggesUsers[]>(`${this.currentEnvironment}/api/club/users`,{headers:this.headers})
  }

  addNewClub(club:AddClub){
    return this.http.post<AddClub[]>(`${this.currentEnvironment}/api/club`,club,{headers:this.headers})
  }

}

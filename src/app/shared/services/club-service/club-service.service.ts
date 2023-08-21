import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Club, TaggedUsers } from '../../models';
import { AuthServiceService } from 'src/app/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClubService {
  constructor(private http: HttpClient , private authService : AuthServiceService) { }

  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  public fileHeaders = new HttpHeaders(); 

  currentEnvironment : string = environment.apiLink;



  private clubData: Club[] = []



  clubDetails$= new BehaviorSubject<Club[]>([]);



  
  deActivateClub(clubId:number,reason){
    return this.http.patch(`${this.currentEnvironment}/api/clubs/${clubId}/deactivate`,{Reason:reason},{headers:this.headers});
  }

  exitClub(clubId:number){
    console.log(clubId);
     return this.http.patch(`${this.currentEnvironment}/api/clubs/${clubId}/user/exit`,{},{headers:this.headers});
  }

  reActivateClub(clubId : number ,reason){
    return this.http.patch(`${this.currentEnvironment}/api/clubs/${clubId}/reactivate`,{Reason:reason},{headers:this.headers});

  }

  reportClub(clubId:number,reason){
    return this.http.patch(`${this.currentEnvironment}/api/clubs/${clubId}/report`,{Reason:reason},{headers:this.headers});
  }

  getAllUsers(){
    return this.http.get<TaggedUsers[]>(`${this.currentEnvironment}/api/usernames`,{headers:this.headers});
  }

  addNewClub(club:FormData){
    return this.http.post<FormData>(`${this.currentEnvironment}/api/club`,club,{headers:this.fileHeaders})
  }

}


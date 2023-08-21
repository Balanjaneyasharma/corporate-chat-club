import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../..';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http : HttpClient) { }


  public headers = new HttpHeaders().set('Content-Type', 'application/json'); 

  currentEnvironment : string = environment.apiLink;

  
  getUserProfile(){
    return this.http.get<UserProfile>(`${this.currentEnvironment}/api/user`,{headers:this.headers});
  }

  updateProfileImage(data : FormData){
    return this.http.patch(`${this.currentEnvironment}/api/user/ProfileImage`,data);
  }
  
}

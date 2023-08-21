import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewUser, User } from '../..';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http : HttpClient) { }

  private userData : User[]=[];
  userDetails$= new BehaviorSubject<User[]>([]);
  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentEnvironment : string = environment.apiLink;



  getUserDetailsObservable(){
    return this.userDetails$.asObservable();
  }

  updateToObservable(response:User[]) {
      this.userData = response;
      this.userDetails$.next(response);
    }

  fetchUserList(){
    return this.http.get<User[]>(`${this.currentEnvironment}/api/admin/users`,{headers:this.headers});
  }

  getClubs(){
    return this.http.get<any[]>(`${this.currentEnvironment}/api/clubnames`,{headers:this.headers});
  }

  createNewUser(userDetails : NewUser){
    return this.http.post<NewUser>(`${this.currentEnvironment}/api/admin/user`, userDetails,{headers:this.headers});
  }

  deActivateUser(userId:number,reason:string){
    return this.http.patch(`${this.currentEnvironment}/api/admin/users/${userId}/deactivate`,{Reason:reason},{headers:this.headers});
  }

  reActivateUser(userId:number,reason:string){
    return this.http.patch(`${this.currentEnvironment}/api/admin/users/${userId}/reactivate`,{Reason:reason},{headers:this.headers});
  }

  deleteUser(userId:number,reason:string){
    return this.http.patch(`${this.currentEnvironment}/api/admin/users/${userId}/delete`,{Reason : reason},{headers:this.headers});
  }
































  
}

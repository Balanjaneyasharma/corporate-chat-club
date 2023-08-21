import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { AuthServiceService } from 'src/app/core';
import { JwtToken } from 'src/app/login-signup/token.interface';
import { environment } from 'src/environments/environment';
import { User } from '../..';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http : HttpClient ) { }
  // curUSerId :number =  1;


  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  array = [];

  private userList$ = new BehaviorSubject<any>(null);;

  private userData : User[]=[];

  currentEnvironment : string = environment.apiLink;

  
  updateToObservable(response:User[]){
    this.userList$.next(response);
  }
  
  getUsersData(){
    return this.http.get<User[]>(`${this.currentEnvironment}/api/user/connections/new`,{headers:this.headers})
  }

  sendRequestToDb(data:User){
    return this.http.post(`${this.currentEnvironment}/api/user/connections/${data.id}`,{},{headers:this.headers});
  }

  getUserListObservable(){
    return this.userList$.asObservable();
  }

}

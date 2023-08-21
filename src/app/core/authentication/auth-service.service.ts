import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtToken } from 'src/app/login-signup/token.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http : HttpClient) { }

  currentEnvironment : string = environment.apiLink;

  loginUser(user) {
    return this.http.post(`${this.currentEnvironment}/api/login`,user);
  }
  
  generateToken(token : string){
    sessionStorage.setItem('token',token);
  }

  getToken(){
    return sessionStorage.getItem('token');
  }

  decodeToken(){
    let token : string = this.getToken();
    let helper : JwtHelperService = new JwtHelperService();
    let decodedToken: JwtToken = helper.decodeToken(token);
    return decodedToken;
  }

  getCurrentUserId(){
    return this.decodeToken().Id;
  }

  checkIsUserGlobalAdmin(){
    return this.decodeToken().Role.toLowerCase() === 'globaladmin';
  }

  logoutUser(){
    sessionStorage.removeItem('token');
  }
  
}
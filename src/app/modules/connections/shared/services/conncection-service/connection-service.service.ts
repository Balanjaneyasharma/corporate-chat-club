import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthServiceService } from 'src/app/core';
import { JwtToken } from 'src/app/login-signup/token.interface';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ConnectionServiceService {

  constructor(private http : HttpClient) { }
  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  connections : UserProfile[]=[];

  currentEnvironment : string = environment.apiLink;

  
  fetchConnectionsData(){
    return this.http.get<UserProfile[]>(`${this.currentEnvironment}/api/user/connections`,{headers:this.headers});
  }

}

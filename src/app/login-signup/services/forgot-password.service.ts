import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http : HttpClient) { };

  currentEnvironment : string = environment.apiLink;


  changePassword(userData){
    return this.http.patch(`${this.currentEnvironment}/api/change/password`,userData);
  }
}

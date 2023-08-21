import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(private http: HttpClient) { };

  currentEnvironment : string = environment.apiLink;


  registerUser(newUser) {
    return this.http.post(`${this.currentEnvironment}/api/register`,newUser);
  }
}


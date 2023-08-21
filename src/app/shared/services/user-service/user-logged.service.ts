import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoggedUser } from '../../models/logged-user-details';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedService {

  constructor(private http : HttpClient) { }

  private curUserDetails$ = new BehaviorSubject<LoggedUser>(null);
  currentEnvironment : string = environment.apiLink;


  getLoggedUserDetails(){
    return this.http.get(`${this.currentEnvironment}/api/user/details`);
  }

  updateLoggedUserDetails(data : LoggedUser){
    this.curUserDetails$.next(data);
  }

  getLoggedUserDetailsObservable(){
    return this.curUserDetails$.asObservable();
  }


}

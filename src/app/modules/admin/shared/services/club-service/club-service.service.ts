import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtToken } from 'src/app/login-signup/token.interface';
import { Club } from '../..';
import { AuthServiceService } from 'src/app/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClubServiceService {





  constructor(private http : HttpClient , private authService : AuthServiceService) {}

  currentEnvironment : string = environment.apiLink;
  private clubData : Club[]=[];
  private clubData$ = new BehaviorSubject<Club[]>([]);

  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  fetchInactiveClubs(){
    return this.http.get<Club[]>(`${this.currentEnvironment}/api/admin/inactivateclubs`,{headers:this.headers});
  }

  deleteClubFromService(id : number,reason : string){
    return this.http.patch(`${this.currentEnvironment}/api/clubs/${id}/delete`,{Reason : reason},{headers : this.headers});
  }

  updateCLubDataObservable(data : Club[]){
    this.clubData$.next(data);
  }

  getClubDataObservable(){
    return this.clubData$.asObservable();
  }

}

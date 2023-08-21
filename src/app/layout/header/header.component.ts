import { LoggedUser } from './../../shared/models/logged-user-details/logged-user.model';
import { Component, OnInit } from '@angular/core';
import { tap, switchMap } from 'rxjs';
import { AuthServiceService } from 'src/app/core';
import { UserLoggedService } from 'src/app/shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  presentDate : Date = new Date();
  userName : string ;
  userProfilePictureUrl : string;

  constructor(private userLogged : UserLoggedService , private authService : AuthServiceService) { }

  ngOnInit(): void {
    this.getUserLoggedDetails();
  }

  getUserLoggedDetails(){
    this.userLogged.getLoggedUserDetails().pipe(
      tap((response : LoggedUser)=> this.userLogged.updateLoggedUserDetails(response)),
      switchMap(()=> this.userLogged.getLoggedUserDetailsObservable())
    ).subscribe((value)=>{
      if(value){
        this.userName=value.displayName;
        this.userProfilePictureUrl = value.profileImageUrl;
      }
    })
  }

  logout(){
    this.authService.logoutUser();
  }



}

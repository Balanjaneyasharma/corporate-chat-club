import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../..';
import { UserProfileService } from '../../shared/services/user-profile.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styles: [
  ]
})
export class AboutComponent implements OnInit {

  userProfile!:UserProfile;

  constructor(private UserProfileService : UserProfileService) { }

  ngOnInit(): void {
    this.UserProfileService.getUserProfile().subscribe((res)=>{
      this.userProfile = res
    });
  }

}

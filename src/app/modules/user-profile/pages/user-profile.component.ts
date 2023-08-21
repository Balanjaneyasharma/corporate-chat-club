import { LoggedUser } from './../../../shared/models/logged-user-details/logged-user.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { AddNewProfilePictureComponent, UserProfile } from '..';
import { UserProfileService } from '../shared/services/user-profile.service';
import { UserLoggedService } from 'src/app/shared';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: []
})
export class UserProfileComponent implements OnInit {
  userProfile:UserProfile;
  modalRef : BsModalRef;

  constructor(private UserProfileService : UserProfileService , private modalService : BsModalService , private userService :UserLoggedService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.UserProfileService.getUserProfile().subscribe((res)=>{
      this.userProfile = res
      console.log(res,typeof(res));
    });

  }
  openModal(){
    const initialState = {
      fromParent: {
        name: this.userProfile.displayName,
        profileImageUrl : this.userProfile.profileImageUrl
      }
    }
    const modalRef = this.modalService.show(AddNewProfilePictureComponent, { class : 'large-modal',initialState});
    modalRef.content.refreshData.subscribe(()=>{
      this.getData();
      this.updateLoggedUser();
    })
  }

  updateLoggedUser(){
    this.userService.getLoggedUserDetails().subscribe((response : LoggedUser)=>{
      this.userService.updateLoggedUserDetails(response);
    })
  }

  


}



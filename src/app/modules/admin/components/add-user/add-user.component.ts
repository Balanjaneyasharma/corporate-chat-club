import { FormGroup, FormControl, Validators} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';

import { NewUser,  UserService } from '../..';
import { AuthServiceService } from 'src/app/core';
import { tap, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
})

export class AddUserComponent  implements OnInit{
  addUserForm : FormGroup;
  formInvalid : boolean =false;
  userDetails : NewUser;
  showClubList = false;
  matchingClubNames : Array<string> = [];
  selectedClubNames: Array<string> = [];
  selectedClubIds : Array<number> = [];
  clubList = [];
  validfield:boolean =false;
  isdisplayName:boolean = false;
  isUserEmail:boolean = false;
  isPhoneNumber:boolean = false;
  
  constructor(private modalRef : BsModalRef, 
    private userService : UserService ,
     private authService : AuthServiceService) { 
  }

  ngOnInit(): void {
    this.createReactiveForm();
    this.getCLubList();
  }

  createReactiveForm(){
    this.addUserForm = new FormGroup({
      firstName : new FormControl('',Validators.required),
      middleName : new FormControl(''),
      lastName : new FormControl('',Validators.required),
      displayName : new FormControl('',Validators.required),
      phoneNumber : new FormControl( '' ,[Validators.required,Validators.pattern(/^\d{10}$/)]),
      email : new FormControl('',Validators.required),
      jobTitle : new FormControl('',Validators.required),
      isAdmin: new FormControl(''),
      adminFor: new FormControl('')
    });
  }

  getCLubList(){
    this.userService.getClubs().subscribe((res)=>{
      this.clubList = res
    })
  }

  close(){
    this.modalRef.hide();
  }

  onClubNameInput(){
    const input = this.addUserForm.get('adminFor')!.value;
    this.matchingClubNames = this.clubList.filter(name => name.toString().includes((input)));
  }

  onClubNameClick(clubName:string) {
    if (!this.selectedClubNames.includes(clubName)) {
      this.selectedClubNames.push(clubName);
      this.selectedClubIds.push(clubName['id'])
    }
    this.showClubList = false;
    this.addUserForm.get('adminFor')!.setValue('');
  }
    
  removeSelectedClub(index: number): void {
    this.selectedClubNames.splice(index, 1);
  }

  addNewUser(){
    const formValues = this.addUserForm.value; 
    const invitationStatus = formValues.invitationStatus ? 1 : 0;
    this.userDetails = new NewUser({
      id: null,
      firstName : formValues.firstName,
      middleName : formValues.middleName,
      lastName : formValues.lastName,
      displayName : formValues.displayName,
      phoneNumber : formValues.phoneNumber,
      email : formValues.email,
      profileImageUrl:null,
      jobTitle : formValues.jobTitle,
      invitationStatus : invitationStatus,
      clubs : (this.selectedClubIds),
      addedBy : this.authService.getCurrentUserId()
    })
    return this.userDetails;
  }

  onSubmit(){
    this.addUserForm.markAllAsTouched();
    this.userService.createNewUser((this.addNewUser())).pipe(
      tap((response : {})=>{
        this.isdisplayName = response['userName'];
        this.isUserEmail  = response['email']
        this.isPhoneNumber = response['phoneNumber'];    
      }),
      switchMap(()=>{
        if((!this.isdisplayName) && (!this.isUserEmail) && (!this.isPhoneNumber )) {
          this.close();
          return this.updateData();
        }
        return of(null);
      })
    ).subscribe();
  }

  updateData(){
    return this.userService.fetchUserList().pipe(
      tap((response)=> this.userService.updateToObservable(response))
    );

  }

}


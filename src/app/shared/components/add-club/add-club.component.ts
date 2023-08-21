import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddClub, ClubService, TaggedUsers } from '../..';
import { AuthServiceService } from 'src/app/core';

@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.component.html',
  styles: []
})
export class AddClubComponent {
  @Output() addedNewClub = new EventEmitter<any>();
  
  currentUserID : number;
  formInvalid: boolean=false;
  imageUrl:any='../../../../../assets/images/addIcon.png';
  reactiveForm : FormGroup;
  showClubMembers = false;
  showClubAdmins = false;
  clubDetails : AddClub;
  matchingMembers : TaggedUsers[] = [];
  matchingAdmins  : TaggedUsers[] = [];
  selectedMembers: TaggedUsers[] = [];
  selectedAdmins : TaggedUsers []=[];
  userList:Array<TaggedUsers> = [];
  selectedAdminsId:Array<number>=[];
  selectedMembersId: Array<number> = [];

  constructor(private modalRef : BsModalRef,private clubService : ClubService, private authService : AuthServiceService) { }

  ngOnInit(): void {
    this.currentUserID = this.authService.getCurrentUserId();
    this.createReactiveForm();
    this.getAllUsers();
  }

  createReactiveForm(){
    this.reactiveForm= new FormGroup({
      clubProfile: new FormControl(''),
      name : new FormControl('',Validators.required),
      description : new FormControl('',Validators.required),
      isPublic : new FormControl(true),
      clubType : new FormControl('closed'),
      clubAdmins : new FormControl(''),
      clubMembers : new FormControl('')
    });
  }

  getAllUsers(){
    this.clubService.getAllUsers()
    .subscribe((response : TaggedUsers[])=>{
      this.userList = response.filter((ele)=> ele.id != this.currentUserID);
    })
  }

  onSubmit(){
    this.reactiveForm.markAllAsTouched();
    if(this.reactiveForm.valid && this.selectedMembersId.length!=0){
      this.clubService.addNewClub(this.submitNewClubData()).subscribe((response)=>{
        this.addedNewClub.emit();
      });
      this.reactiveForm.reset();
      this.closeModal();
    }
  }

  submitNewClubData(){
    const formData = new FormData();
    const formValues = this.reactiveForm.value;
    const clubType = formValues.clubType == "closed";
    formData.append('name',formValues.name);
    formData.append('profileImageUrl',this.selectedFile);
    formData.append('description',formValues.description);
    formData.append('isPublic',JSON.stringify(formValues.isPublic));
    formData.append('clubType',JSON.stringify(clubType));
    formData.append('clubAdmins',JSON.stringify(this.selectedAdminsId));
    formData.append('clubMembers',JSON.stringify(this.selectedMembersId));
    return formData;
  }
  
  closeModal(){
    this.modalRef.hide();
  }


  selectedFile : File ;
  changeImage(event){
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }

  onClubAdminInput(){
    const input = this.reactiveForm.get('clubAdmins')!.value.toLowerCase();
    this.matchingAdmins = this.userList.filter(user => user.displayName.toLowerCase().includes(input));
    this.matchingAdmins = this.matchingAdmins.filter((admin)=> !this.selectedMembersId.includes(admin.id));
  }

  onClubMemberInput(){
    const input = this.reactiveForm.get('clubMembers')!.value.toLowerCase();
    this.matchingMembers = this.userList.filter(user => user.displayName.toLowerCase().includes(input));
    this.matchingMembers = this.matchingMembers.filter((member)=> !this.selectedAdminsId.includes(member.id));
  }

  onClubMemberClick(user: TaggedUsers) {
    if (!this.selectedMembers.includes(user)) {
      this.selectedMembers.push(user);
      this.selectedMembersId.push(user.id)
    }
    this.showClubMembers=false;
    this.reactiveForm.get('clubMembers')!.setValue('');
    // this.matchingMembers = this.userList
  }

  onClubAdminClick(user: TaggedUsers) {
    if (!this.selectedAdmins.includes(user)) {
      this.selectedAdmins.push(user);
      this.selectedAdminsId.push(user.id)
    }

    this.showClubAdmins=false;
    this.reactiveForm.get('clubAdmins')!.setValue('');
    // this.matchingAdmins = this.userList
  }

  removeSelectedMember(index: number): void {
    this.selectedMembers.splice(index,1)
    this.selectedMembersId.splice(index, 1);
  }

  removeSelectedAdmin(index: number): void {
    this.selectedAdmins.splice(index,1)
    this.selectedAdminsId.splice(index, 1);
  }

}


import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AuthServiceService } from 'src/app/core';
import { UserProfileService } from '../..';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserLoggedService } from 'src/app/shared';

@Component({
  selector: 'app-add-new-profile-picture',
  templateUrl: './add-new-profile-picture.component.html',
  styles: [
  ]
})
export class AddNewProfilePictureComponent {
  @Input() fromParent : {name : string , profileImageUrl : string};

  @Output() refreshData = new EventEmitter();
  fileName : string='';

  constructor(private modalRef : BsModalRef , private formBuilder : FormBuilder,
    private authService : AuthServiceService , private userService : UserProfileService  ){}

  userProfileImageURL  ;
  fileSelected : File;
  profileImageForm : FormGroup;


  ngOnInit(){
    this.userProfileImageURL = this.fromParent.profileImageUrl;
    this.profileImageForm = this.formBuilder.group({
      profileImage : []
    })
  }

  changeProfilePicture(){
    const formData = new FormData();
    formData.append(this.fileSelected.name,this.fileSelected);
    this.userService.updateProfileImage(formData).subscribe(()=>{
      this.refreshData.emit();
    });
    this.close();


  }


  close(){
    this.modalRef.hide();
  }

  changeImage(event){
    if (event.target.files.length > 0) {
       this.fileSelected = event.target.files[0];
      console.log(this.fileSelected);
      this.fileName=this.fileSelected.name;
      const reader = new FileReader();
      reader.readAsDataURL(this.fileSelected);
      reader.onload = () => {
        this.userProfileImageURL = reader.result;
      };
    }
  }




  

}

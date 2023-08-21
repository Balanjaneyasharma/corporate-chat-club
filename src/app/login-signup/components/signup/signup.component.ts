import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserService } from '../..';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})

export class SignupComponent implements OnInit{
  registerForm:FormGroup;
  attachment:string;
  imageUrl:string;
  formInvalid : boolean = false;
  isdisplayName:boolean = false;
  isUserEmail:boolean = false;
  isPhoneNumber:boolean = false;

  constructor(private formbuilder : FormBuilder,private registerService : RegisterUserService , private route:Router){}


  ngOnInit(){
    this.initialiseForm();
  }

  initialiseForm(){
    this.registerForm=this.formbuilder.group({
      firstName : new FormControl('',Validators.required),
      middleName : new FormControl('',Validators.required),
      lastName : new FormControl('',Validators.required),
      displayName : new FormControl('',Validators.required),
      email:['',this.validateEmail],
      phone:['',this.validateMobile],
      password:'',
      newpassword:''
    });

  }
  
  validateMobile(control:AbstractControl , isPhoneNumber:boolean) {
    if (!control.value) {
     return { required: true };
    } else if (!/^\d{10}$/.test(control.value)) {
     return { mobile: true };
    }
    return null;
  }

  validateEmail(control:AbstractControl , isUserEmail:boolean) {
    if (!control.value) {
     return { required: true };   
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(control.value)) {   
     return { email: true }; 
    }
    return null;
  }

   registerUser(){
    this.registerService.registerUser(this.registerForm.value).subscribe((res)=>{
      this.isdisplayName  = res['displayName'];
      this.isUserEmail = res['email'];
      this.isPhoneNumber = res['phoneNumber'];        
      ((!this.isdisplayName) && (!this.isUserEmail) && (!this.isPhoneNumber)) ?
      (this.route.navigateByUrl('login-signup/login')) : "";
    });
  }

}

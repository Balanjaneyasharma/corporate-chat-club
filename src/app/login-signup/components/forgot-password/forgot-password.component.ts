import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ForgotPasswordService } from '../..';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: [
  ]
})
export class ForgotPasswordComponent implements OnInit , OnDestroy{
  isUserInValid : boolean = false;
  isFormInvalid : boolean = false;
  subscription : Subscription;
  forgotPasswordForm : FormGroup;

  
  constructor(private formBuilder : FormBuilder, private route : Router, private forgotPasswordService : ForgotPasswordService)  {}

  ngOnInit(){
    this.initilaiseForm();
  }

  initilaiseForm(){
    this.forgotPasswordForm = this.formBuilder.group({
      userName : ['',Validators.required],
      password : ['',Validators.required],
      confirmPassword : [''],
    },{
      validator: this.matchPasswords('password','confirmPassword')
    });
    this.forgotPasswordForm.get('confirmPassword').disable();
    this.subscription = this.forgotPasswordForm.get('password').valueChanges.subscribe(value => {
      if (value.trim() == '') {
        this.forgotPasswordForm.get('confirmPassword').disable();
      }
      else {
        this.forgotPasswordForm.get('confirmPassword').enable();
      }
    });
  }

  submit(){
    if(this.forgotPasswordForm.valid){
      this.isFormInvalid = false;
      const userDetails  = {
        userName : this.forgotPasswordForm.get('userName').value,
        password : this.forgotPasswordForm.get('password').value
      };
      this.forgotPasswordService.changePassword(userDetails).subscribe((response)=>{
        this.isUserInValid = response['userNameError'];
        if(!this.isUserInValid) this.route.navigateByUrl('login-signup/login');
      })
    }
    else this.isFormInvalid = true;
  }

  matchPasswords(passwordKey : string , confirmPasswordKey : string){
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value && password.value?.length !=0 && confirmPassword.value?.length != 0) {
        confirmPassword.setErrors({ passwordMismatch: true });
      }
      else if(confirmPassword.value?.length === 0) confirmPassword.setErrors({required : true});
      else confirmPassword.setErrors(null);
    };
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit{

  isUserName : boolean = false;
  isFormInvalid : boolean = false;
  isPassword:boolean = false;
  loginForm:FormGroup;
  subscription : Subscription;

  constructor(private formbuilder : FormBuilder,
    private router : Router,
    private authService : AuthServiceService) {}

  ngOnInit(){
    this.initialiseForm();
  }

  initialiseForm(){
    this.loginForm=this.formbuilder.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    });
  }

  loginUser(){
    if(this.loginForm.valid){
      this.isFormInvalid= false;
      this.subscription = this.authService.loginUser(this.loginForm.value).subscribe((response)=>{
        this.isUserName  = response['userNameError'];
        this.isPassword = response['passwordError'];
        if(!this.isUserName && !this.isPassword){
          this.authService.generateToken(response['token']);
          this.router.navigateByUrl("corporate-club",{replaceUrl : true});
        }
      })
    }
    else this.isFormInvalid=true;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

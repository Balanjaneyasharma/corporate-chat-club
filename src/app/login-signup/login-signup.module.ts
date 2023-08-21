import { SharedModule } from 'src/app/shared';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent, LoginComponent, LoginSignupComponent, LoginSignupRoutingModule, SignupComponent } from '.';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    LoginSignupComponent,
    ForgotPasswordComponent,
  ],

  imports: [
    CommonModule,
    LoginSignupRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    SharedModule
  ]

})
export class LoginSignupModule { }

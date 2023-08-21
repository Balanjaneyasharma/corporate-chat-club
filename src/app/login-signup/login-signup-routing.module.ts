import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent, LoginComponent, LoginSignupComponent, SignupComponent } from '.';

const routes: Routes = [
  { path: '', component: LoginSignupComponent, children: [
      { path: 'login',title : 'Login' ,component: LoginComponent, },
      { path: 'signup',title : 'Signup' ,component: SignupComponent },
      { path : 'forgot-password', title : 'Forgot-Password',component : ForgotPasswordComponent },
      { path: '', pathMatch: 'full', redirectTo: 'login' } 
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LoginSignupRoutingModule { }

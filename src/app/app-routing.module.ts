import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './core/guards';

const routes: Routes = [

  { path : '',redirectTo :'login-signup',pathMatch:'full'},
  { path : 'login-signup',loadChildren : ()=> import('./login-signup/login-signup.module').then(ls=>ls.LoginSignupModule) },
  { path : 'corporate-club', canActivate :[AuthGuardGuard], loadChildren : ()=> import('./modules/corporate-chat-club/corporate-chat-club.module').then(main=>main.CorporateChatClubModule)},
  { path : '**' ,redirectTo : 'corporate-club'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardGuard, AuthGuardGuard } from 'src/app/core';
import { CorporateChatClubComponent } from '.';

const routes: Routes = [
  { path : '',component :CorporateChatClubComponent , children : [
    { path : 'my-home',  title :'My-Home' , loadChildren : ()=> import('../my-home/my-home.module').then(mh=>mh.MyHomeModule) },
    { path :'connections',title :'Connections' , loadChildren : ()=> import('../connections/connections.module').then(c=>c.ConnectionsModule) },
    { path : 'clubs',title :'Clubs' , loadChildren : ()=> import('../clubs/clubs.module').then(c=>c.ClubsModule)},
    { path : 'admin', canActivate : [AdminGuardGuard],title :'Admin' , loadChildren : ()=> import('../admin/admin.module').then(a=>a.AdminModule)},
    { path :'user-profile',title :'User-Profile' , loadChildren : ()=> import('../user-profile/user-profile.module').then(u=>u.UserProfileModule)},
    {path : '', redirectTo : 'my-home',pathMatch:'full'}
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateChatClubRoutingModule { }

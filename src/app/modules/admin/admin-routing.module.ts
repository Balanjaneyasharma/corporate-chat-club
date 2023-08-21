import { InactiveClubsComponent } from './pages/inactive-clubs/inactive-clubs.component';
import { UsersComponent } from './pages/users/users.component';
import { AdminComponent } from './pages/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',component:AdminComponent,children :[
    {path : 'users',component : UsersComponent},
    {path : 'inactive-clubs',component : InactiveClubsComponent},
    {path:'',pathMatch:'full',redirectTo:'users'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

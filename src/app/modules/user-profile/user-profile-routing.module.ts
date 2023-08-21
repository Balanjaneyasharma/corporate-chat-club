import { UserProfileComponent } from './pages/user-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components';

const routes: Routes = [
  {path :'',component : UserProfileComponent,children:[
    {path : 'about',component :AboutComponent},
    { path : '',redirectTo :'about',pathMatch :'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }

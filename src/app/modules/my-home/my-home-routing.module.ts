import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyClubChatComponent, MyClubInfoComponent, MyClubsComponent, MyHomeComponent, MyThreadChatComponent, MyThreadsComponent } from '.';

const routes: Routes = [
  { path : '',component :MyHomeComponent , children : [
    { path : 'my-clubs',component : MyClubsComponent, children:[
        { path :':id/chat',component:MyClubChatComponent},
        { path :':id/info',component:MyClubInfoComponent}
      ]
    },
    {path : 'my-threads',component : MyThreadsComponent,children:[
      { path :':id/chat',component : MyThreadChatComponent},
      
    ]},
    {path: '', pathMatch: 'full',redirectTo:'my-clubs'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MyHomeRoutingModule { }

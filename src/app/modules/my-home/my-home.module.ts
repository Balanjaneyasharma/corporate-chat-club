import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClubParticipantsComponent, ClubRequestsComponent, MuteClubComponent, MyClubChatComponent, MyClubInfoComponent, MyClubListComponent, MyClubListItemComponent, MyClubsComponent, MyHomeComponent, MyThreadChatComponent, MyThreadInfoComponent, MyThreadListComponent, MyThreadListItemComponent, MyThreadsComponent, ScrollToBottomDirectiveDirective, UnmuteClubComponent } from '.';
import { MyHomeRoutingModule } from './my-home-routing.module';
import { SharedModule } from 'src/app/shared';
import { NgxEmojModule } from 'ngx-emoj';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    MyHomeComponent,
    MyClubListComponent,
    MyClubChatComponent,
    MyThreadListComponent,
    MyThreadChatComponent,
    MyClubInfoComponent,
    MyClubsComponent,
    MyThreadsComponent,
    MuteClubComponent,
    ClubParticipantsComponent,
    ClubRequestsComponent,
    MyThreadInfoComponent,
    UnmuteClubComponent,
    MyClubListItemComponent,
    MyThreadListItemComponent,
    ScrollToBottomDirectiveDirective
  ],
  imports: [
    CommonModule,
    MyHomeRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    SharedModule,
    NgxEmojModule,
    TooltipModule.forRoot()

  ]
})
export class MyHomeModule { }

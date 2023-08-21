import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from 'src/app/shared';

import { AddUserComponent, AdminComponent, ClubActionsComponent, DeactivateUserComponent, DeleteClubComponent, DeleteUserComponent, InactiveClubListComponent, InactiveClubsComponent, ReactivateUserComponent, UserActionsComponent, UserListComponent, UserRolePipe, UsersComponent } from '.';


@NgModule({
  declarations: [
    AdminComponent,
    UserListComponent,
    InactiveClubListComponent,
    UsersComponent,
    InactiveClubsComponent,
    UserActionsComponent,
    AddUserComponent,
    ClubActionsComponent,
    DeactivateUserComponent,
    ReactivateUserComponent,
    DeleteClubComponent,
    DeleteUserComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    AdminRoutingModule,
    AgGridModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    SharedModule,
    Ng2SearchPipeModule
  ]
})
export class AdminModule { }

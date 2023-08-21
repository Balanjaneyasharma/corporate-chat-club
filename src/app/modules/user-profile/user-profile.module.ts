import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AboutComponent, AddNewProfilePictureComponent, UserProfileComponent, UserProfileRoutingModule } from '.';


@NgModule({
  declarations: [
    UserProfileComponent,
    AboutComponent,
    AddNewProfilePictureComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class UserProfileModule { }

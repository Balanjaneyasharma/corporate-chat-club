import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStatusPipe } from './pipes/user-status/user-status.pipe';
import { UserRolePipe } from './pipes/user-role/user-role.pipe';



@NgModule({
  declarations: [
    UserStatusPipe,
    UserRolePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

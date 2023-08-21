import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../..';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
})

export class DeleteUserComponent {
  @Input() fromParent:any;
  @Output() confirmDeleteUser = new EventEmitter<any>();

  deleteUserReason:string='';
  constructor(private modalRef : BsModalRef , private userService:UserService) { }

  ngOnInit(): void {
    
  }
  close(){
    this.modalRef.hide();
  }

  deleteUser(){
    this.userService.deleteUser(this.fromParent.id,this.deleteUserReason).subscribe((res)=>{
      this.confirmDeleteUser.emit();
    })
    this.close();
  }


}

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../..';

@Component({
  selector: 'app-reactivate-user',
  templateUrl: './reactivate-user.component.html',
})
export class ReactivateUserComponent implements OnInit {
  @Input() data:any;
  @Output() confirmReactivateUser = new EventEmitter();
  reActivateUserReason:string='';

  constructor(private modalRef : BsModalRef , private userService : UserService) { }

  ngOnInit(): void {
  }

  close(){
    this.modalRef.hide();
  }

  reActivateUser(){
    this.userService.reActivateUser(this.data['id'],this.reActivateUserReason).subscribe((res)=>{
      this.confirmReactivateUser.emit();
    })
    this.close();
  }


}

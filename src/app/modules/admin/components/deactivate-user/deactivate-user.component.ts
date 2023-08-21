import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../..';

@Component({
  selector: 'app-deactivate-user',
  templateUrl: './deactivate-user.component.html',
 
})
export class DeactivateUserComponent implements OnInit {
  @Input() data:any;
  @Output() confirmDeactivateUser = new EventEmitter();
  userDeactivationReason:string='';

  constructor(private modalRef : BsModalRef, private userService : UserService) { }

  ngOnInit(): void {
    
  }
  
  close(){
    this.modalRef.hide()
  }

  deactivateUser(){
    this.userService.deActivateUser(this.data['id'],this.userDeactivationReason).subscribe((res)=>{
      this.confirmDeactivateUser.emit();
    })
    this.close();
  }
  
}

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { AddUserComponent, User, UserService } from '../..';
import { tap, switchMap } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  userData : User[]=[];
  modalRef:BsModalRef

  constructor(private userService:UserService,private modalService : BsModalService) { }

  ngOnInit(): void { 
    this.getUserData(); 
  }

  getUserData(){
    this.updateData().pipe(
      switchMap(()=> this.userService.getUserDetailsObservable())
    ).subscribe((value)=>{
      this.userData = value;
    })
  }

  openModal(){
    this.modalRef=this.modalService.show(AddUserComponent,{class:'small-modal'})
  }

  updateData(){
    return this.userService.fetchUserList().pipe(
      tap((response)=> this.userService.updateToObservable(response))
    );
  }

}

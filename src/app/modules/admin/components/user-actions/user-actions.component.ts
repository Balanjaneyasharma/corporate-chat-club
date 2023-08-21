import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ICellEditorParams, ICellRendererParams } from 'ag-grid-community';
import { DeactivateUserComponent, DeleteUserComponent, ReactivateUserComponent, User, UserService } from '../..';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
})

export class UserActionsComponent implements OnInit {
  @Output() cellClicked = new EventEmitter<any>();
  buttonText:string;
  value :string='';
  id : number;
  name : string;
  data : User;
  params : ICellRendererParams
  modalRef: BsModalRef
  constructor(private modalService : BsModalService , private userService : UserService) { }

  ngOnInit(): void {
  }

  agInit(params: ICellEditorParams<any, any>): void {
    this.id =params.data.id;
    this.data=params.data;
    this.name = params.data.displayName;
    this.value = params.data.status;
    if(this.value.trim() === 'Active'){
      this.buttonText='deactivate user'
    }
    else{ 
      this.buttonText='reactivate user'
    }
  }

  refresh(params: ICellRendererParams) {
    return false;
  }

  changeUserRole(){
    const initialState ={
      data :{
        id : this.id,
        name : this.name
      }
    }
    if(this.buttonText ==='deactivate user'){
      const modalRef=this.modalService.show(DeactivateUserComponent,{class : 'small-modal',initialState});
      modalRef.content.confirmDeactivateUser.pipe(
        switchMap(()=> this.updateUserData())
      ).subscribe();
    }
    else{ 
      const modalRef=this.modalService.show(ReactivateUserComponent,{class:'small-modal',initialState});
      modalRef.content.confirmReactivateUser.pipe(
        switchMap(()=> this.updateUserData())
      ).subscribe();
    }
    
  }

  deleteUser(){
    const initialState ={
      fromParent :{
        id : this.id,
        name : this.name
      }
    }
    const modalRef=this.modalService.show(DeleteUserComponent,{class:'small-modal',initialState});
    modalRef.content.confirmDeleteUser.pipe(
      switchMap(()=> this.updateUserData())
    ).subscribe();
  }

  onClick() {
    console.log(this.params);
  }

  updateUserData(){
    return this.userService.fetchUserList().pipe(
      tap((response)=> this.userService.updateToObservable(response))
    )
  }


}

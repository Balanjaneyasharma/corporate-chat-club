import { tap, switchMap } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { User, UserServiceService } from '../..';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})

export class UserListComponent implements OnInit {
  data :User[]=[];
  FilterTerm : string ='';
  constructor(private userService : UserServiceService) { }

  ngOnInit(): void {   
    this.getData();
  }

  getData(){
    this.updateUserList().pipe(
      switchMap(()=> this.userService.getUserListObservable())
    ).subscribe((userList)=>{
      this.data = userList;
    })
  }

  sendRequest(user: User){
    this.userService.sendRequestToDb(user).pipe(
      switchMap(()=> this.updateUserList())
    ).subscribe();
  }

  updateUserList(){
    return this.userService.getUsersData().pipe(
      tap((response)=> this.userService.updateToObservable(response))
    );
  }
}

import { tap, switchMap } from 'rxjs';
import { Component,Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClubService, ThreadMessagesService, ThreadsService } from '../..';

@Component({
  selector: 'app-unmute-club',
  templateUrl: './unmute-club.component.html'
})

export class UnmuteClubComponent implements OnInit {
  @Input() fromParent:any;


  constructor(private modalRef : BsModalRef,private clubService:ClubService,private threadService : ThreadsService ) { }

  ngOnInit(): void {
    this.fromParent.isNotificationsMuted;
  }

  unmuteClub(){
    if (this.fromParent.location === "my-club" ) {
     this.clubService.UnmuteClub(this.fromParent.clubId).pipe(
       switchMap(()=> this.updateClubList())
     ).subscribe();
    }
    else{
      this.threadService.UnmuteClub(this.fromParent.id).pipe(
        switchMap(()=> this.updateThreadList())
      ).subscribe();
     }
    this.close();
  }
  close(){
    this.modalRef.hide();
  }

  updateThreadList(){
    return this.threadService.fetchThreadList().pipe(
      tap((response)=> this.threadService.updateThreadListObservable(response))
    );
  }

  updateClubList(){
    return this.clubService.fetchClubList().pipe(
      tap((response)=> this.clubService.updateToObservable(response))
    );
  }


}
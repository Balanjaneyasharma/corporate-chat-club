import { tap, switchMap } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit } from '@angular/core';
import { ClubService, ThreadMessagesService, ThreadsService } from '../..';

@Component({
  selector: 'app-mute-club',
  templateUrl: './mute-club.component.html',
})

export class MuteClubComponent implements OnInit {
  @Input() fromParent:any;

  constructor(private modalRef : BsModalRef,private clubService: ClubService, private threadService : ThreadsService ,  private threadMessageService : ThreadMessagesService) { }

  ngOnInit(): void {
  }

  muteClub(){
    if (this.fromParent.location === "my-club" ) {
      this.clubService.MuteClub(this.fromParent.clubId).pipe(
        switchMap(()=> this.updateClubList())
      ).subscribe();
    }
    else {        
      this.threadService.MuteClub(this.fromParent.id).pipe(
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
      tap((response) => this.clubService.updateToObservable(response))
    );
  }
  
}

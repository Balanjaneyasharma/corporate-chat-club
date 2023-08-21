import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClubService } from '../..';

@Component({
  selector: 'app-leave-club',
  templateUrl: './leave-club.component.html',
})


export class LeaveClubComponent implements OnInit {
  @Input() fromParent:any;
  @Output() removeClub : EventEmitter<any> = new EventEmitter();
  currUserId:number = 52;
  constructor(private bsModalRef : BsModalRef,private clubService : ClubService) { }

  ngOnInit(): void { }

  leaveClub(){
    this.clubService.exitClub(this.fromParent.clubId).subscribe(()=>{
      this.removeClub.emit();
    });
    this.close();
  }

  close(){
    this.bsModalRef.hide();
  }

}

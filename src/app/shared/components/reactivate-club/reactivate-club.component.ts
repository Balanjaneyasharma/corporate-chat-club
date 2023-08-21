import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClubService } from '../..';

@Component({
  selector: 'app-reactivate-club',
  templateUrl: './reactivate-club.component.html',
  styles: [
  ]
})
export class ReactivateClubComponent {
  @Input() fromParent:any;
  @Output() confirmReactivateClub : EventEmitter<any> = new EventEmitter();


  reason : string = '';

  constructor(private modalRef : BsModalRef, private clubService : ClubService) { }

  ngOnInit(): void {
    console.log(this.fromParent);
  }

  close(){
    this.modalRef.hide();
  }

  reactivateClub(){
    this.clubService.reActivateClub(this.fromParent.clubId,this.reason).subscribe(()=>{
      this.close();
      this.confirmReactivateClub.emit();
    })
  }

}

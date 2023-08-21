import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClubServiceService } from '../..';

@Component({
  selector: 'app-delete-club',
  templateUrl: './delete-club.component.html',
  styles: []
})
export class DeleteClubComponent {
  @Input() fromParent:any;
  @Output() confirmDeleteClub = new EventEmitter<any>();

  reason : string = '';
  constructor(private modalRef : BsModalRef,private clubService: ClubServiceService) { }

  ngOnInit(): void { }

  close(){
    this.modalRef.hide();
  }
  
  delete(){
    this.clubService.deleteClubFromService(this.fromParent.clubId,this.reason).subscribe(()=>{
      this.confirmDeleteClub.emit('');
      this.close();
    })
  }


}

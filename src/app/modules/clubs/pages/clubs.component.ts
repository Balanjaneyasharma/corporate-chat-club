import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';

import { AddClubComponent } from 'src/app/shared';
import { Club, ClubServiceService } from '..';
import { tap, switchMap } from 'rxjs';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styles: []
})

export class ClubsComponent implements OnInit {
  clubData : Club[]=[];
  modalRef : BsModalRef;

  constructor(private clubService : ClubServiceService,private modalService : BsModalService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.updateChanges().pipe(
      switchMap(()=>this.clubService.getClubDetailsObservable())
    ).subscribe((response)=>{
      this.clubData = response;
    })
  }

   
  openModal(){
    const modalRef=this.modalService.show(AddClubComponent, { class: 'large-modal'});
    modalRef.content.addedNewClub.pipe(
      switchMap(()=>this.updateChanges())
    ).subscribe();
  }

  updateChanges(){
    return this.clubService.fetchClubData().pipe(
      tap((response)=>this.clubService.updateToObservable(response))
    );
  }

  updateData(){
    this.clubService.fetchClubData().subscribe((response)=> {
      this.clubService.updateToObservable(response);
    })
  }

}

import { switchMap, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddClubComponent } from 'src/app/shared';
import { Router } from '@angular/router';
import { Club, ClubService } from '../..';

@Component({
  selector: 'app-my-clubs',
  templateUrl: './my-clubs.component.html',
  
})
export class MyClubsComponent implements OnInit {
  clubData : Club[]=[];
  modalRef:BsModalRef;

  constructor(private clubService : ClubService , private modalService : BsModalService , private Router  : Router) { }

  ngOnInit(): void {
    this.getData(); 
  }

  getData(){
    this.updateClubObservable().pipe(
      switchMap(()=>this.clubService.getClubDataObservable())
    ).subscribe((value)=>{
      this.clubData = value;
      this.sortData(this.clubData);
    });  
  }

  sortData(data){
    data =data.sort((a,b)=>{
      return new Date(b.postedOn).getTime() - new Date(a.postedOn).getTime();
    })
  }

  openModal(){
    const modalRef=this.modalService.show(AddClubComponent, { class: 'large-modal'});
    modalRef.content.addedNewClub.pipe(
      switchMap(()=> this.updateClubObservable())
    ).subscribe();
  }

  navigateToClubs(){
    this.Router.navigate(['/corporate-club/clubs']);
  }

  updateClubObservable(){
    return this.clubService.fetchClubList().pipe(
      tap((response)=>{
        this.clubService.updateToObservable(response);
      })
    )
  }

  ngOnDestroy(){
  }

}




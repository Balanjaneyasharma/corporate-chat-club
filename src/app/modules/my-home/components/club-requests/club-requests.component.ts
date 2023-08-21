import { tap, switchMap } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthServiceService } from 'src/app/core';
import { ClubinfoService, Requests } from '../..';

@Component({
  selector: 'app-club-requests',
  templateUrl: './club-requests.component.html',
  
})
export class ClubRequestsComponent implements OnInit {
  @Input() data : Requests[];
  @Input() isAdmin : boolean;
  clubId:number;
  isCurrentUserGlobalAdmin : boolean;
  filterText : string='';

  constructor(private clubInfoService:ClubinfoService,private activatedRoute:ActivatedRoute , private authService : AuthServiceService) { }
  
   
  ngOnInit(): void {
    this.isCurrentUserGlobalAdmin = this.authService.checkIsUserGlobalAdmin();
    this.clubId = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  addRequest(id: number) {
    this.clubInfoService.acceptRequest(id,this.clubId).pipe(
      switchMap(()=> this.updateClubInfoObservable())
    ).subscribe();
  }

  deleteRequest(id: number) {
    this.clubInfoService.deleteRequest(id , this.clubId).pipe(
      switchMap(()=> this.updateClubInfoObservable())
    ).subscribe();
  }

  updateClubInfoObservable(){
    return this.clubInfoService.fetchClubDetails(this.clubId).pipe(
      tap((response)=> this.clubInfoService.updateToObservable(response))
    );
  }
}

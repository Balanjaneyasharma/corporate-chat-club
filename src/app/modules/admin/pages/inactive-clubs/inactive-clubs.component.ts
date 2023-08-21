import { Component, OnInit } from '@angular/core';
import { Club, ClubServiceService } from '../..';
import { tap, switchMap } from 'rxjs';

@Component({
  selector: 'app-inactive-clubs',
  templateUrl: './inactive-clubs.component.html',
  
})
export class InactiveClubsComponent implements OnInit {

  clubData : Club[]=[];

  constructor(private clubService : ClubServiceService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.updateData().pipe(
      switchMap(()=> this.clubService.getClubDataObservable())
    ).subscribe((response)=>{
      this.clubData = response;      
    });
  }

  updateData(){
    return this.clubService.fetchInactiveClubs().pipe(
      tap((response)=> this.clubService.updateCLubDataObservable(response))
    );
  }

}

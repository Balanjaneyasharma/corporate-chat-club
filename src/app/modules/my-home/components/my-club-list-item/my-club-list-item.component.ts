import { Component, Input, Output } from '@angular/core';
import { AuthServiceService } from 'src/app/core';
import { Club } from '../..';

@Component({
  selector: 'app-my-club-list-item',
  templateUrl: './my-club-list-item.component.html',
  styles: [
  ]
})
export class MyClubListItemComponent {

  @Input() clubListItem : Club;
  currentUserId : number;

  constructor(private authService : AuthServiceService){}

  ngOnInit(){
    this.currentUserId = this.authService.getCurrentUserId()
    this.clubListItem.postedOn = this.getIstTime(this.clubListItem.postedOn);
  }

  getIstTime(utcDate : Date){
    if(!utcDate) return null;
    let dateIst = new Date(utcDate);
    dateIst.setHours(dateIst.getHours()+5);
    dateIst.setMinutes(dateIst.getMinutes()+30);
    return dateIst;
  }

  compareDate(postedDate : Date){
    const currentDate = new Date();
    let required  = new Date(postedDate);    
    return (currentDate.toDateString() === required.toDateString());
  }



}

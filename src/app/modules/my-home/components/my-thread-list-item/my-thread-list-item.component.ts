import { Component, Input } from '@angular/core';
import { AuthServiceService } from 'src/app/core';
import { Thread } from '../..';

@Component({
  selector: 'app-my-thread-list-item',
  templateUrl: './my-thread-list-item.component.html',
  styles: [
  ]
})
export class MyThreadListItemComponent {
  @Input() threadListItem : Thread;
  currUserId : number ;
  constructor(private authService : AuthServiceService) {}

  ngOnInit(){
    this.currUserId = this.authService.getCurrentUserId();
    this.threadListItem.postedOn = this.getIstTime(this.threadListItem.postedOn);
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

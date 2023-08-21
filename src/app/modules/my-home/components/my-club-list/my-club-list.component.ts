import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { AuthServiceService } from 'src/app/core';
import { Club, ClubService } from '../../shared';

@Component({
  selector: 'app-my-club-list',
  templateUrl: './my-club-list.component.html',
 
})
export class MyClubListComponent implements OnInit {
  @Input() clubData: Club[];
  @Output() refreshData = new EventEmitter<any>();
  filterText: string = '';
  currentUserId : number;

  constructor(private authService : AuthServiceService) { }

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
  }

  ngOnChanges(changes : SimpleChanges){
    if('clubData' in changes){
      this.clubData=changes['clubData'].currentValue;
    }
  }

}

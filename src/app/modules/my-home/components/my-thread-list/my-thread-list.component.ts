import { Component, OnInit,Input } from '@angular/core';
import { AuthServiceService } from 'src/app/core';
import { Thread } from '../..';

@Component({
  selector: 'app-my-thread-list',
  templateUrl: './my-thread-list.component.html',
})

export class MyThreadListComponent implements OnInit {
  @Input() data : Thread[];
  
  filterText : string='';
  currUserId :number ;

  constructor(private authService : AuthServiceService){ }

  ngOnInit(): void {
    this.currUserId = this.authService.getCurrentUserId();
  }

}

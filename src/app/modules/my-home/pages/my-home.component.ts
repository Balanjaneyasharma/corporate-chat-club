import { Component, OnInit } from '@angular/core';
import { SignalRConnectService } from '..';

@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.component.html',
  
})
export class MyHomeComponent implements OnInit {

  constructor( private signalRService : SignalRConnectService) { }

  ngOnInit(): void {
    // this.signalRService.startConnection();
    
  }

}

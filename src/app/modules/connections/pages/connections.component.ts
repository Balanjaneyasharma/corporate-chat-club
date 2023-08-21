import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { ConnectionServiceService, NewConnectionComponent, UserProfile } from '..';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styles: [
  ]
})
export class ConnectionsComponent implements OnInit {
  connectionsData : UserProfile[]=[];
  modalRef:BsModalRef;

  constructor(private connectionService : ConnectionServiceService,private modalService : BsModalService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.connectionService.fetchConnectionsData().subscribe((data)=>{
      this.connectionsData= data;
    });
  }

  openModal(){
    this.modalRef=this.modalService.show(NewConnectionComponent);
  }

}

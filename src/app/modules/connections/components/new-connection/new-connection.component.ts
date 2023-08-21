import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { User } from '../../shared';

@Component({
  selector: 'app-new-connection',
  templateUrl: './new-connection.component.html',

})

export class NewConnectionComponent implements OnInit {
  data : User;
  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  close() {
    this.modalRef.hide();
  }

}

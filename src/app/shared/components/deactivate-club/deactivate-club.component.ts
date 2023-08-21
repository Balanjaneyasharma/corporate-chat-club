import { outputAst } from '@angular/compiler';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClubService } from '../..';

@Component({
  selector: 'app-deactivate-club',
  templateUrl: './deactivate-club.component.html',
  
})
export class DeactivateClubComponent implements OnInit {
  @Input() fromParent:any;
  @Output() deactivatClub : EventEmitter<any> = new EventEmitter();

  deactivatedReason:string = '';

  constructor(private bs : BsModalRef, private clubService : ClubService, private router:Router) { }

  ngOnInit(): void {
  }

  deactivateClub(){
    this.clubService.deActivateClub(this.fromParent.clubId,this.deactivatedReason).subscribe(()=>{
      this.deactivatClub.emit();
    });    
    this.close();
 }

  close(){
    this.bs.hide();
  }

}

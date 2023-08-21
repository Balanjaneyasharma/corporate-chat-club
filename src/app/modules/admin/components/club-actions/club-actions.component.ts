import { tap, switchMap } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, Pipe } from '@angular/core';
import { ICellEditorParams, ICellRendererParams } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ReactivateClubComponent } from 'src/app/shared';
import { Club, ClubServiceService, DeleteClubComponent } from '../..';

@Component({
  selector: 'app-club-actions',
  templateUrl: './club-actions.component.html',
  styles: [
  ]
})
export class ClubActionsComponent implements OnInit {

  buttonText:string;
  value : Club;
  sample!:string;
  modalRef:BsModalRef;
  params : ICellEditorParams;
  isClubAdmin:Club[] = [];


  constructor(private modalService : BsModalService,private clubService : ClubServiceService) { }

  agInit(params: ICellEditorParams<any, any>): void {
    this.value = params.data;
    this.params=params;
  }

  refresh(params: ICellRendererParams) {
    return false;
  }


  ngOnInit(): void {}

  reactivateClub(data : Club){
    const initialState ={
      fromParent :{
        clubId : data.id,
        name : data.name
      }
    }
    const modalRef=this.modalService.show(  ReactivateClubComponent  ,{class : 'large-modal',initialState});
    modalRef.content.confirmReactivateClub.pipe(
      switchMap(()=> this.updateObservable())
    ).subscribe();
  }

  deleteClub(data : Club){
    const initialState ={
      fromParent :{
        clubId : data.id,
        name : data.name
      }
    }
    const modalRef=this.modalService.show(  DeleteClubComponent  ,{class : 'large-modal',initialState});
    modalRef.content.confirmDeleteClub.pipe(
      switchMap(()=> this.updateObservable())
    ).subscribe();
  }

  updateObservable(){
    return this.clubService.fetchInactiveClubs().pipe(
      tap((response)=>{
        this.clubService.updateCLubDataObservable(response)
      })
    );
  }
 

}

import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { DeactivateClubComponent, FilterSet, LeaveClubComponent, ReactivateClubComponent } from 'src/app/shared';
import { AuthServiceService } from 'src/app/core';
import { Club, ClubServiceService } from '../..';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
})

export class ClubListComponent implements OnInit {
  @Input() clubData: Club[];
  @Output() refreshData : EventEmitter<any> = new EventEmitter();

  filteredData : Club[];
  isCurrentUserGlobalAdmin : boolean;
  public filterTerm: string = '';
  selectedClubRoles = [];
  selectedClubStatus = [];
  selectedDates = [];
  searchWord = '';

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,private clubService:ClubServiceService,private authService : AuthServiceService) { }

  filterSet : FilterSet[]=[{
    filterName : 'club-type',
    filterValues : [
      { name : 'public-open', checked : false } ,{ name : 'public-closed',checked : false} , { name : 'private',checked : false}
    ]
   },{
     filterName : 'status',
     filterValues : [
       { name : 'active',checked : false},{ name : 'inactive',checked : false}
     ]
   },{
     filterName: 'created on',
     filterValues : [
       { name : 'past 7 days',checked : false},{ name : 'last month',checked : false}
     ],
   },{
     filterName : 'search',
     searchWord : ''
   }
  ];

  ngOnInit(): void {
    this.isCurrentUserGlobalAdmin = this.authService.checkIsUserGlobalAdmin();
    this.filteredData = this.clubData;
  }

  ngOnChanges(changes : SimpleChanges){
    if('clubData' in changes){      
      this.clubData=changes['clubData'].currentValue;
      this.filteredData = this.clubData;
      this.filterData(this.filterSet);
    }
  }


  filterData(filters ){
    this.filterSet = filters;
    this.filteredData = this.clubData;
    this.selectedClubRoles=[];
    this.selectedClubStatus=[];
    this.selectedDates=[];
    filters.forEach((filter)=>{
      if(filter.filterValues){
        filter.filterValues.forEach((value)=>{
          if(value.checked){
            if(filter.filterName === 'club-type'){
              this.selectedClubRoles.push(value.name)
            }else if(filter.filterName === 'status'){
              this.selectedClubStatus.push(value.name)
            }
            else if(filter.filterName === 'created on'){
              this.selectedDates.push(value.name);
            }
          }
        })  
      }
      else if(!filter.filterValues){
        this.filterTerm = filter.searchWord;
      }
    });
    const currentDate = new Date();
    const pastDate7Days = new Date();
    const pastDate1Month = new Date();
    pastDate7Days.setDate(currentDate.getDate() - 7);
    pastDate1Month.setMonth(currentDate.getMonth() - 1);

    this.filteredData = this.clubData.filter(club => {
      const createdOnDate = new Date(club.createdOn);
      const roleMatches = this.selectedClubRoles.length === 0 ||
                          (club.isPublic && club.type === false && this.selectedClubRoles.includes('public-open')) ||
                          (club.isPublic && club.type === true && this.selectedClubRoles.includes('public-closed')) ||
                          (!club.isPublic && this.selectedClubRoles.includes('private'));
      const statusMatches = this.selectedClubStatus.length === 0 ||
                            (club.status && this.selectedClubStatus.includes('active')) ||
                            (!club.status && this.selectedClubStatus.includes('inactive'));
      const dates = this.selectedDates.length === 0 || 
                    (createdOnDate >= pastDate7Days && createdOnDate <= currentDate && this.selectedDates.includes('past 7 days')) ||
                    (createdOnDate >= pastDate1Month && createdOnDate <= currentDate && this.selectedDates.includes('last month'));
      return roleMatches && statusMatches && dates;
    });
  }

  deactivateClub(data: Club) {
    const initialState = {
      fromParent: {
        clubId: data.clubId,
        name: data.name
      }
    }
    const modalRef = this.modalService.show(DeactivateClubComponent, { class: 'large-modal', initialState });
    modalRef.content.deactivatClub.subscribe(()=>{
      this.updateChanges();
    })
  }

  reactivateClub(data: Club) {
    const initialState = {
      fromParent: {
        clubId: data.clubId,
        name: data.name
      }
    }
    const modalRef = this.modalService.show(ReactivateClubComponent, { class: 'large-modal', initialState });
    modalRef.content.confirmReactivateClub.subscribe(()=>{
      this.updateChanges();
    })
  }

  exitClub(data: Club) {
    const initialState = {
      fromParent: {
        clubId: data.clubId as number,
        name: data.name
      }
    }
    const modalRef = this.modalService.show(LeaveClubComponent, { class: 'large-modal', initialState });
    modalRef.content.removeClub.subscribe(()=>{
      this.updateChanges();
    })
  }

  requestToJoin(id:number){
    this.clubService.makeRequestToClub(id).subscribe((res)=>{
      this.updateChanges();
    })
  }

  cancelRequest(id:number){
    this.clubService.cancelRequestToClub(id).subscribe((res)=>{
      this.updateChanges();
    })
  }

  joinClub(id:number){
    this.clubService.joinClub(id).subscribe((res)=>{
      this.updateChanges();
    })
  }

  updateChanges(){
    this.refreshData.emit();
  }
}

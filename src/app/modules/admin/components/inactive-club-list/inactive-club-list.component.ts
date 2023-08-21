import { GridOptions } from 'ag-grid-community';
import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FilterSet } from 'src/app/shared';
import { Club, ClubActionsComponent, ClubServiceService } from '../..';

@Component({
  selector: 'app-inactive-club-list',
  templateUrl: './inactive-club-list.component.html',
  

})
export class InactiveClubListComponent implements OnInit , OnChanges {
  @Input() clubData : Club[];

  filterTerm : string ='';
  filteredData : Club[] ;
  headerHeight = 30;
  rowHeight= 70;
  gridOptions : GridOptions={};
  
  isPublicOpen : false;
  isPublicClosed: false;
  isPrivate :false;

  selectedClubRoles =[];
  selectedClubStatus =[];
  selectedDates=[];
  searchWord = '';
  rowData : Club[]

  constructor(private clubService : ClubServiceService) { }
  

  ngOnInit(): void {
    this.filteredData = this.clubData;
    this.rowData=this.filteredData;
    this.gridOptions.columnDefs=[
      { field : 'name ',headerName : 'Club Name',filter :true,

        cellRenderer:(params)=>{
          return `<p class="text-capitalize">${params.data.name}</p><span class="text-secondary">${params.data.description}</span>`
        },
        getQuickFilterText:(params)=>{
          return `<p class="text-capitalize">${params.data.name}</p><span class="text-secondary">${params.data.description}</span>`
        }
        
      },
      { field : 'createdBy',headerName :'Created By',
        cellRenderer : (params)=>{
          const createdBy = params.data.createdBy;
          const createdOn = params.data.createdOn;
          const formattedDate = new DatePipe('en-US').transform(createdOn, 'dd MMM yyyy');
          return `<p class="text-capitalize">${createdBy}</p><span class="text-secondary">On ${formattedDate}</span>`;
        }
      },
      { field : 'clubType',headerName : 'Club Type',valueGetter: this.clubType, 
        filter : 'ClubFilterPipe',
      },
      

      { field : 'deactivatedBy',headerName : 'Deactivated By',
        cellRenderer : (params)=>{
          const deactivatedBy = params.data.deactivatedBy;
          const deactivatedOn = params.data.deactivatedOn;
          const formattedDate = new DatePipe('en-US').transform(deactivatedOn, 'dd MMM yyyy');
          return `<p class="text-capitalize">${deactivatedBy}</p><span class="text-secondary">On ${formattedDate}</span>`;
        }
      },
      { field : 'reason',headerName :'Reason',width: 350},
      { headerName : 'Actions',cellRenderer : ClubActionsComponent}

    ]
  }

  ngOnChanges(changes : SimpleChanges){
    if('clubData' in changes){
      this.rowData=changes['clubData'].currentValue;
      if(this.filterSet) this.filterData(this.filterSet);
    }
  }

  filterSet : FilterSet[]=[{
    filterName : 'club-type',
    filterValues : [
      { name : 'public-open', checked : false } ,{ name : 'public-closed',checked : false} , { name : 'private',checked : false}
    ]
   },{
     filterName : 'created on',filterValues:[
      { name : 'past 7 days',checked : false},{ name : 'last month',checked : false}
     ],
   },{
     filterName : 'search',
     searchWord : ''
   } 
  ]

  filterData(filters){
    this.filterSet =filters;
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
            }
            else if(filter.filterName === 'created on'){
              this.selectedDates.push(value.name);
            }
          }
        })  
      }
      else if(!filter.filterValues){
        this.filterTerm = filter.searchWord;
        this.onSearch();
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
      const dates = this.selectedDates.length === 0 || 
                          (createdOnDate >= pastDate7Days && createdOnDate <= currentDate && this.selectedDates.includes('past 7 days')) ||
                          (createdOnDate >= pastDate1Month && createdOnDate <= currentDate && this.selectedDates.includes('last month'));
      
      return roleMatches && dates;
    });
    this.rowData = this.filteredData;
  }

  onGridReady(){
    this.gridOptions.api?.sizeColumnsToFit();
  }

  onEventFromChild(event : any){
    const rowData = event.data;
  }

  onFilterValuesChange() {
  }
  
  onSearch(){
    this.gridOptions.api?.setQuickFilter(this.filterTerm);
  }

  private clubType(params): string {
    const isPublic = params.data.isPublic;
    const type = params.data.type;
    if (isPublic) {
      return type ? 'Public-Closed' : 'Public-Open';
    } else {
      return 'Private';
    }
  }
  
  reset(){
    this.filterTerm='';
    this.isPrivate=false;
    this.isPublicClosed=false;
    this.isPublicOpen=false;
    this.onSearch();
  }


}

import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { FilterSet } from 'src/app/shared';

import { User, UserActionsComponent, UserService } from '../..';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  
})
export class UserListComponent implements OnInit , OnChanges {
  @Input() userList : User[];
  headerHeight = 30;
  rowHeight= 70;
  gridOptions : GridOptions={};
  rowData : User[];
  filteredData : User[];
  filterTerm : string ='';
  clubActive : boolean =false;
  clubInactive : boolean=false;
  isUser:boolean = false;
  isClubAdmin:boolean=false;
  isGlobalAdmin:boolean=false;
  isUserActive:string='';
  filterSet : FilterSet[];
  selectedUserRoles : string [] = [];
  selectedUserStatus : string [] = [];


  constructor(private userService : UserService) { }

  ngOnChanges(changes: SimpleChanges) {
    if ('userList' in changes) {
      this.userList=changes['userList'].currentValue; 
      this.filteredData = this.userList;
      this.rowData = this.filteredData ; 
      if(this.filterSet) this.filterData(this.filterSet);
    }
  }

  
  filterData(filters){
    this.filterSet = filters;
    this.filteredData = this.userList;
    this.selectedUserRoles=[];
    this.selectedUserStatus=[];
    filters.forEach((filter)=>{
      if(filter.filterValues){
        filter.filterValues.forEach((value)=>{
          if(value.checked){
            if(filter.filterName === 'user role'){
              this.selectedUserRoles.push(value.name)
            }else if(filter.filterName === 'status'){
              this.selectedUserStatus.push(value.name)
            }
          }
        })  
      }
      else if(!filter.filterValues){
        this.filterTerm = filter.searchWord;
      }
    });

    this.filteredData = this.userList.filter(user => {
      const roleMatches = this.selectedUserRoles.length === 0 ||
                          (user.role === false && user.adminCount === 0 && this.selectedUserRoles.includes('user')) ||
                          (user.role === false && user.adminCount > 0 && this.selectedUserRoles.includes('club-admin')) ||
                          (user.role === true  && this.selectedUserRoles.includes('global-admin'));
      const statusMatches = this.selectedUserStatus.length === 0 ||
                          (user.status.trim().toLowerCase() === 'active' && this.selectedUserStatus.includes('active')) ||
                          (user.status.trim().toLowerCase() === 'inactive' && this.selectedUserStatus.includes('inactive'));
      return roleMatches && statusMatches;
    });
    this.rowData = this.filteredData;
    this.OnSearch();
    
    
  }

  ngOnInit(): void {
    this.initializeGrid();
    this.initailizeFilters();
    
  }

  initializeGrid(){
    this.filteredData = this.userList;
    this.rowData=this.filteredData;
    this.gridOptions.columnDefs=[
      { field :'name' ,headerName:'UserName',
        cellRenderer:(params)=>
        {
           return `<p class="text-accent-violet">${params.data.displayName}</p><span"> ${params.data.email}</span>`
        },
        width : 250,
        getQuickFilterText:(params)=>
        {
           return `<p class="text-accent-violet">${params.data.displayName}</p><span> ${params.data.email}</span>`
        }
      },
      { field:'phoneNumber',headerName :'Mobile Number'},
      { field :'addedBy',headerName :'Added By',
        cellRenderer:(params)=>
        {
          const addedBy = params.data.addedBy;
          const addedOn = params.data.addedOn;
          const formattedDate = new DatePipe('en-US').transform(addedOn, 'dd MMM yyyy');
          return `<p class="text-capitalize">${addedBy}</p><span class="text-secondary">On ${formattedDate}</span>`;
        },
        
        getQuickFilterText:(params)=>
        {
          const addedBy = params.data.addedBy;
          const addedOn = params.data.addedOn;
          const formattedDate = new DatePipe('en-US').transform(addedOn, 'dd MMM yyyy');
          return `<p class="text-capitalize">${addedBy}</p><span class="text-secondary">On ${formattedDate}</span>`;

        }
      },
      { field :'status',headerName:'User status',cellRenderer:(params)=>{
        return `<p class=text-capitalize>${params.data.status}</p>`
      }},

      { field :'role',headerName :'User Role',cellRenderer:(params)=>{
        return `<p class=text-capitalize>${(params.data.role)? "GlobalAdmin" : (params.data.adminCount)>0 ? "ClubAdmin" : "User"}</p>`
      }},

      { field :'activeClubs',headerName:'Active Clubs'},
       { field : 'actions' ,headerName :'Actions',cellRenderer : UserActionsComponent,//cellRendererParams:(params)=>{

      }
    ]
  }

  initailizeFilters(){
    this.filterSet = [{
      filterName : 'user role',
      filterValues : [
        { name : 'user', checked : false } ,{ name : 'club-admin',checked : false} , { name : 'global-admin',checked : false}
      ]
     },{
       filterName : 'status',
       filterValues : [
         { name : 'active',checked : false},
         { name : 'inactive',checked : false}
       ]
     },{
       filterName : 'search',
       searchWord : ''
     }
    ]  
  }

  onGridReady(){
    this.gridOptions.api?.sizeColumnsToFit();

  }
  OnSearch(){
    this.gridOptions.api?.setQuickFilter(this.filterTerm);
  }


}

import { Component,  Input, OnInit } from '@angular/core';
import { FilterSet } from 'src/app/shared';
import { UserProfile } from '../..';

@Component({
  selector: 'app-connection-list',
  templateUrl: './connection-list.component.html',
})
export class ConnectionListComponent implements OnInit {
  @Input() connectionsData : UserProfile[];
  filterTerm :string='';
  filteredData : UserProfile[];

  constructor() { }


  filterSet : FilterSet[]=[{
     filterName : 'search',
     searchWord : ''
   }
  ];
  
  searchText : string='';

  ngOnInit(): void {
    this.filteredData = this.connectionsData;
  }

  searchData(text : string){
    this.searchText=text.toLowerCase();
  }

  reset(){
    this.searchText='';
    this.filterTerm='';
  }

  filterData(filters ){
    this.filteredData = this.connectionsData;
    filters.forEach((filter)=>{
      if(!filter.filterValues){
        this.filterTerm = filter.searchWord;
      }
    });
  }

}

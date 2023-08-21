import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterSet,FilterValue } from '../..';

@Component({
  selector: 'app-data-filters',
  templateUrl: './data-filters.component.html',
  styles: [
  ]
})
export class DataFiltersComponent {
  @Input() filterSet : FilterSet[];
  @Output() filtersChanged = new EventEmitter<FilterSet[]>();

  constructor() {}

  onChange(filter : FilterSet){
    const checkedValues = filter.filterValues.filter(value => value.checked);
    if (checkedValues.length > 1) {
      filter.selectedFilters = `${checkedValues.length} selected`;
    } else if (checkedValues.length === 1) {
      filter.selectedFilters = checkedValues[0].name;
    } else {
      filter.selectedFilters = '';
    }
    this.emitFilters();
  }

  reset(){
    this.filterSet.forEach((filter)=>{
      if(filter.selectedFilters){
        filter.selectedFilters='';
      }
      if(filter.filterValues){
        filter.filterValues.forEach((value)=>{
          value.checked = false;
        })
      }
      else{
        filter.searchWord = '';
      }
    });
    this.emitFilters()
  }

  emitFilters(){
    this.filtersChanged.emit(this.filterSet);
  }


}
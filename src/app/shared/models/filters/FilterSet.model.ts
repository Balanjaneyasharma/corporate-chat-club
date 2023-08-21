import { FilterValue } from ".";
export interface  FilterSet{
    filterName : string,
    filterValues ?: FilterValue[],
    requireDate ? : boolean
    filteredDate? : Date,
    identifiers ? : []
    searchWord ? :string,
    selectedFilters ? : string
    selectedDate ? : Date,
    
}
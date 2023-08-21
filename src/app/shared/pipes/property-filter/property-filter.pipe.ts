import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propertyFilter'
})
export class PropertyFilterPipe implements PipeTransform {
  
  transform(items: any[], property: string, term: string): any[] {
    if (!items) {
      return [];
    }
    if (!term) {
      return items;
    }
    return items.filter(item => item[property].toLowerCase().includes(term.toLowerCase()));
  }

}

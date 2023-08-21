import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'clubStatus'
})
export class ClubStatusPipe implements PipeTransform {

  transform(clubs: any[], isActive : boolean , isInactive : boolean): any[] {
    
    let result = [];
    console.log(clubs);
    if (isActive) {
      result = result.concat(clubs.filter(club => club.status));
    }
    else if(!isActive){
      result = result.filter((club)=>!club.status);
    }
    if (isInactive) {
      result = result.concat(clubs.filter(club => !club.status));
    }
    else if(!isInactive){
      result = result.filter((club => club.status))
    }
    if(!isActive && !isInactive){
      result = clubs;
    }
    return result;
  }


}
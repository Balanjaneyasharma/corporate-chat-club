import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clubFilter'
})
export class ClubFilterPipe implements PipeTransform {

  transform(clubs: any[],isPublicOpen : boolean , isPublicClosed: boolean,isPrivate : boolean): any[] {
    console.log(12);
    let result = [];
    if(!isPrivate && !isPublicOpen && !isPublicClosed){
      result = clubs;
    }
    else {
      if(isPublicOpen){
        console.log('oublic -open yes called')
        result = result.concat(clubs.filter(club => club.isPublic && !club.type))
      }
      else if(!isPublicOpen){
        result = result.filter(club => !(club => club.isPublic && !club.type) );
      }
      if(isPublicClosed){
        result = result.concat(clubs.filter(club => club.isPublic && club.type))
      }
      else if(!isPublicClosed){
          result = result.filter(club => !(club.isPublic && (club.type)) );
      }
      if(isPrivate){
        result = result.concat(clubs.filter(club => !club.isPublic))
      }
      else if(!isPrivate){
        result = result.filter(club => club.isPublic) ;

      }
    }
    return result;
  }

}

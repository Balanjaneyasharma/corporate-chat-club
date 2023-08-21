import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userStatus'
})
export class UserStatusPipe implements PipeTransform {

  transform(userList: any[],isActive : boolean,isInactive:boolean): any[] {
    let result = [];
    if(!isActive && !isInactive){
      result = userList;
    }
    else{
      if (isActive) {
        result = result.concat(userList.filter(userList => userList.status.trim().toLowerCase() === 'active'));
      }
      else if(!isActive){
        result = result.filter((user)=> user.status.trim() !== 'active');
      }
      if (isInactive) {
        result = result.concat(userList.filter(userList => userList.status.trim().toLowerCase() === 'inactive'));
      }
      else if(!isInactive){
        result = result.filter((user)=> user.status.trim() !== 'inactive')
      }
      
  
    } 
    return result;
  }

}

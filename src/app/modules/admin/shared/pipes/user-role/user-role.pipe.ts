// import { user } from './../../models/user-model/user.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {

  transform(userList : any[],isUser:boolean,isClubAdmin:boolean,isGlobalAdmin:boolean): any[] {
    let result = [];
    if(!isClubAdmin && !isGlobalAdmin && !isUser){
      result = userList;
    }
    else{
      if(isUser){
        result = result.concat(userList.filter(userList => userList.role === false && userList.adminCount === 0));
      }
      else if(!isUser){
        result = result.filter(userList => !(userList.role === false && userList.adminCount === 0) )
      }
      if(isClubAdmin){
        result=result.concat(userList.filter(user => user.role === false && user.adminCount > 0))
      }
      else if(!isClubAdmin){
        result = result.filter(user => !(user.role === false && user.adminCount > 0) )
      }
      if(isGlobalAdmin){
        result=result.concat(userList.filter(user => user.role === true))
      }
      else if(!isGlobalAdmin){
        result = result.filter(user => user.role === false)
      }  
    }
    
    return result;

  }

}

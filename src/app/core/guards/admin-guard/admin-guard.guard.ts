import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../..';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  
  constructor(private authService : AuthServiceService , private route : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.checkIsUserGlobalAdmin();
  }
  
}

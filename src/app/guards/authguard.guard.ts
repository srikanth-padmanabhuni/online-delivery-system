import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { NotificationService } from '../services/sharing/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(
    private router:Router, 
    private authService: AuthService, 
    private notification: NotificationService ) 
  {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const isLoggedIn = this.authService.isUserLoggedIn();
      if(isLoggedIn) {
        return true;
      } else {
        this.notification.showInfoMessage("Please login anf try again !!!", "Info");
        this.router.navigate(['']);
        return false;
      }
  }
  
}

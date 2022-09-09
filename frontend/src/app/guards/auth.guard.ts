import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router){}
  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['signin'])
      return false;
    }
    return true;
  }
    
  
  
}

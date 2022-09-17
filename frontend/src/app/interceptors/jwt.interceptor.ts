import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication-service/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('token');
    
    if(token && this.authService.isAuthenticated()) {
      const clonedReq = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        } 
        
      });
      
      return next.handle(clonedReq);
    } else {
      if(this.router.url === '/register'){

      } else {
        this.router.navigate([''])
      }
      
      return next.handle(request);
    }
  }
}

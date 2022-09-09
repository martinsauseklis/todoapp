import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('token');
    
    if(token) {
      const clonedReq = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        } 
        
      });
      
      return next.handle(clonedReq);
    } else {
      return next.handle(request);
    }
  }
}

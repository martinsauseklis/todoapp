import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

export interface UserForm {
  email?: string;
  password?: string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  signin(signinForm: UserForm) {
    return this.http.post<any>('http://localhost:3000/auth/signin', signinForm).pipe(
      map((token) => {
        sessionStorage.setItem('token', token.access_token)
        
      })
    )
  }

  register(registerForm: UserForm) {
    
    return this.http.post<any>('http://localhost:3000/auth/register', registerForm).pipe(
     
    )
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }

    return false;
    
  }

  signOut() {
    sessionStorage.removeItem('token');
    
  }

  loggedUser(){
    const token = sessionStorage.getItem('token')
    if(token){
      return this.jwtHelper.decodeToken(token);
    }
    
  }
}

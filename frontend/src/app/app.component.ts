import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from './services/authentication-service/authentication.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'frontend';
  buttonValue() {
    if (this.authService.isAuthenticated()){
      return 'Sign Out'
    } else if (this.router.url === '/register') {
      return 'Sign In'
    } else {
      return 'Register'
    }
  }

  loggedEmail() {
    if (this.authService.isAuthenticated()){
      return this.authService.loggedUser().user.email;
    } 

    return;
  }

  constructor(private authService: AuthenticationService, private router: Router, private jwtHelper: JwtHelperService){}

  onClick(){
    switch(this.buttonValue()) {
      case 'Sign In':
        this.router.navigate(['']);
        break;
      case 'Register':
        this.router.navigate(['/register']);
        break;
      case 'Sign Out':
        
        this.authService.signOut();
        this.router.navigate([''])
        break;
    }
  }
}

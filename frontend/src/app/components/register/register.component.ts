import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  error: string;
  registrationSuccess: string;

  registerForm: FormGroup;

  

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router ) {
    
   }
  
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]]
    })
  }

  clearError(){
    this.error ='';
  }
  onSubmit() {
    if (!this.registerForm.valid){
      return
    }
    
    this.authService.register(this.registerForm.value).pipe(catchError((err: Error) => throwError(() => {err.message = 'User registered already, please Sign In';  return err}))).subscribe({
      next: () => {
        this.registrationSuccess = 'Registration completed, redirecting to Sign In'
        setTimeout(() => this.router.navigate(['']), 1500)
      },
      error: (err: Error) => this.error = err.message
    })
  }
  
}

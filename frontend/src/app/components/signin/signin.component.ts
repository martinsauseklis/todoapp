import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  
  
  signinForm: FormGroup;

  constructor(private authService: AuthenticationService, private router: Router, private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: [null, [
        Validators.required,
        Validators.email
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(3)
      ]]
    })

    
  }

  onSubmit(){
    if (!this.signinForm.valid){
      return
    }

     this.authService.signin(this.signinForm.value).pipe(
      map((token) => {
        this.router.navigate(['todo']);
        
      })
    ).subscribe();

   
  }
  

}

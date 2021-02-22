import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  user: any;

  constructor(private AuthService: AuthService, public router: Router) { 
    this.loginFormGroup = new FormGroup(
      {
        email: new FormControl(""),
        password: new FormControl("")
      },
      Validators.required
    );
  }

  ngOnInit(): void {
  }
  

  async login() {
    if (this.loginFormGroup.valid) {
      const email = this.loginFormGroup.get("email").value;
      const password = this.loginFormGroup.get("password").value;
      
      try {
        const user = await this.AuthService.signIn(email, password)
        console.log(user);
        //added local storage for the auth guard 
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['search']);
      }
      catch (error) {
        console.log("Error: " + error);
      }
    }
  }

  logout() {
    this.AuthService.signOut();
  }
}

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
    const email = this.loginFormGroup.get("email").value;
    const password = this.loginFormGroup.get("password").value;
    
    const user = await this.AuthService.signIn(email, password)
    console.log(user);
    this.router.navigate(['search']);
  }

  logout() {
    this.AuthService.signOut();
  }
}

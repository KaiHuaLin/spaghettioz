import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;

  constructor(private AuthService: AuthService) { 
    this.loginFormGroup = new FormGroup(
      {
        email: new FormControl(""),
        password: new FormControl("")
      },
      Validators.required
    );
     
    this.registerFormGroup = new FormGroup(
      {
        name: new FormControl(""),
        email: new FormControl("", Validators.email),
        password: new FormControl("", Validators.minLength(8))
      },
      Validators.required
    );
  }

  ngOnInit(): void {
  }

  async register() {
    if (this.registerFormGroup.valid) {
      const credential = {
        email: this.registerFormGroup.get("email").value,
        password: this.registerFormGroup.get("password").value,
        displayName: this.registerFormGroup.get("name").value,
      }

      try {
        const user = await this.AuthService.create_user(credential);

        // update displayName
        // this.AuthService.update_user(user, { displayName: credential.displayName })
        console.log(user);
      }
      catch (error) {
        console.log("Error: " + error);
      }
    }
  }

  async login() {
    const email = "eric@test.com";
    const password = "test1234";
    const userCredential = await this.AuthService.signIn(email, password)
    const user = userCredential.user;
    console.log(user);
  }

  logout() {
    this.AuthService.signOut();
  }
}

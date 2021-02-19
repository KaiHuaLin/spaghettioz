import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup;
  
  constructor(private AuthService: AuthService) { 
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
      const email = this.registerFormGroup.get("email").value;
      const password = this.registerFormGroup.get("password").value;
      const displayName = this.registerFormGroup.get("name").value;

      try {
        const user = await this.AuthService.create_user(email, password, displayName);
        console.log(user);

        // user will be logged in once the user is created
      }
      catch (error) {
        console.log("Error: " + error);
      }
    }
  }
}

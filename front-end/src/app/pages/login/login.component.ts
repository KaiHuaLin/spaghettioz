import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;

  constructor(private http: HttpClient) { 
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

register(){
   if(this.registerFormGroup.valid){
    const headers = { 'content-type': 'application/json'} 
    const body = JSON.stringify({ 'email': this.registerFormGroup.get("email").value,
                    'password':  this.registerFormGroup.get("password").value,
                    'displayName': this.registerFormGroup.get("name").value});
    this.http.post("https://us-central1-spaghettio.cloudfunctions.net/api/users/", body).subscribe(data =>
    console.log(data));
   }
    
  }

  login(){

  }

}

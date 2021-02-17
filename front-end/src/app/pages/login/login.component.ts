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
  user: any;

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
     const body = { email: this.registerFormGroup.get("email").value,
                     password:  this.registerFormGroup.get("password").value,
                     displayName: this.registerFormGroup.get("name").value};
     console.log(body);
     this.http.post("https://us-central1-spaghettio.cloudfunctions.net/api/users/", body).subscribe(data =>  
     console.log(data)
     
  );
    }
     
   }
 
   login(){
     if(this.loginFormGroup.valid){
       const body = { email: this.loginFormGroup.get("email").value,
                     password:  this.loginFormGroup.get("password").value};
     console.log(body);
     this.http.post("https://us-central1-spaghettio.cloudfunctions.net/api/users/login/", body, {responseType: 'text' }).subscribe(data =>  {
       if(data){
         this.user = data;
         console.log(this.user);
       } 
       //this.router.navigate(['favorites'])
     });
     
     }
    }

}

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
  user: any;

  constructor(private http: HttpClient) { 
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

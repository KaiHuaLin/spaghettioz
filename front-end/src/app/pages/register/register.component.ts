import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup;
  
  constructor(private http: HttpClient) { 
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
    console.log("Here");
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

}

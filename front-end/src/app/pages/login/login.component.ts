import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/models/User';
import { DbService } from 'src/app/service/db/db.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  user: any;

  constructor(private AuthService: AuthService, public router: Router, private auth: AngularFireAuth,private afs: AngularFirestore, private Db: DbService) { 
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

  //logs in with google
  async googleSignin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  //adds user to the database
  private updateUserData(user) {
    console.log(user);
    this.Db.create_user(user.uid, user.email, "user.password");

    this.AuthService.update_user(user, { displayName: user.displayName });
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['search']);
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

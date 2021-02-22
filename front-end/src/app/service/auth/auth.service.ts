import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';

import {DbService} from '../../service/db/db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private Db: DbService) { }

  user = false;

  // create user
  async create_user(email: string, password: string, displayName: string) {
    const user = (await this.auth.createUserWithEmailAndPassword(email, password)).user;
    console.log("Authentication: User created");

    this.Db.create_user(user.uid, email, password);

    await this.update_user(user, { displayName: displayName });
    return user;
  }

  // update user
  async update_user(user: firebase.User, updateInfo: object) {
    await user.updateProfile(updateInfo);
    console.log("Authentication: User updated");

    this.Db.update_user(user.uid, updateInfo);
  }

  // check if user is logged in
  checkSignInStatus() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email + " logged in");
      } else {
        console.log("no login");
        return false;
      }
    });
  }

  // sign in
  async signIn(email: string, password: string) {
    const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  }

  // sign out
  signOut() {
    //remove from local storage 
    localStorage.removeItem('user');
    return this.auth.signOut();
  }

  //used to check if logegd in for auth guard 
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }
}

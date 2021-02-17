import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';

import {DbService} from '../../service/db/db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private Db: DbService) { }

  // create user
  async create_user(credential) {
    const email = credential.email;
    const password = credential.password;
    const displayName = credential.displayName;

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

  // sign in
  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  signOut() {
    return this.auth.signOut();
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>

  constructor(private db: AngularFirestore) { 
    this.usersCollection = this.db.collection('users');
    this.users = this.db.collection<User>('users').valueChanges();
  }

  create_user(uid: string, email: string, password: string) {
    const user: User = {
      uid: uid,
      email: email,
      password: password,
    };
    this.usersCollection.doc(uid).set(user);
    console.log("Firestore: User created");
  }

  async update_user(uid: string, updateInfo: object) {
    this.usersCollection.doc(uid).update(updateInfo);
    console.log("Firestore: User updated");
  }
}

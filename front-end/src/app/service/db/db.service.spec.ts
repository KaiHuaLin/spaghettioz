import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '../../../environments/environment'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { DbService } from './db.service';

describe('DbService', () => {
  let service: DbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ]
    });
    service = TestBed.inject(DbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create user', () => {
    expect(service.get_user("gjhsJxfW7QO1ZmE52IImC")).toBeDefined();
  });

  it('update user', () => {
    expect(service.update_user("gjhsJxfW7QO1ZmE52IImC", {displayName: "test"})).toBeUndefined();
  });

  it('update user favorite', () => {
    expect(service.update_user("gjhsJxfW7QO1ZmE52IImC", {favorite: []})).toBeUndefined();
  });

  it('update user pantry', () => {
    expect(service.update_user("gjhsJxfW7QO1ZmE52IImC", {pantry: []})).toBeUndefined();
  });

  it('get user', () => {
    expect(service.get_user("gjhsJxfW7QO1ZmEImC")).toBeDefined();
  });
});

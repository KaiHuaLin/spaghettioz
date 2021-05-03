import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('signin success', () => {
    expect(service.signIn("erictest@test.com", "12345678")).toBeTruthy();
  });

  it('signout success', () => {
    expect(service.signIn("erictest@test.com", "12345678")).toBeTruthy();
  });
});

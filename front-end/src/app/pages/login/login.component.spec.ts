import { ComponentFixture, TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        RouterTestingModule,
        ReactiveFormsModule, FormsModule
        
      ],
      declarations: [ LoginComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //checks fields are valid
  it('form invalid when empty', () => {
    expect(component.loginFormGroup.valid).toBeFalsy();
  });
  it('email field validity', () => {
    let email = component.loginFormGroup.controls['email']; 
    expect(email.valid).toBeFalsy(); 
  });
  it('password field validity', () => {
    let password = component.loginFormGroup.controls['password']; 
    expect(password.valid).toBeTruthy(); 
  });

  //checks for correct login
  it('valid user login', async () => {
    expect(component.loginFormGroup.valid).toBeFalsy();
    component.loginFormGroup.controls['email'].setValue("lauren@test.com");
    component.loginFormGroup.controls['password'].setValue("passpass");
    expect(component.loginFormGroup.valid).toBeTruthy();

    
    // Trigger the login function
    component.login();
    var user = JSON.parse(localStorage.getItem('user'));

    // Now we can check to make sure the emitted value is correct
    expect(user.email).toBe("lauren@test.com");
    expect(user.displayName).toBe("lauren");
  });
});


  

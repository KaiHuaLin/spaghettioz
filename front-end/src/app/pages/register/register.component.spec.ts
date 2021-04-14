import { ComponentFixture, TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        RouterTestingModule,
        ReactiveFormsModule, FormsModule
      ],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.registerFormGroup.valid).toBeFalsy();
  });
  it('email field validity', () => {
    let email = component.registerFormGroup.controls['email']; 
    expect(email.valid).toBeFalsy(); 
  });
  it('password field validity', () => {
    let password = component.registerFormGroup.controls['password']; 
    expect(password.valid).toBeTruthy(); 
  });

  //checks for correct register
  it('valid user register', async () => {
    expect(component.registerFormGroup.valid).toBeFalsy();
    component.registerFormGroup.controls['email'].setValue("lauren@test.com");
    component.registerFormGroup.controls['password'].setValue("passpass");
    component.registerFormGroup.controls['name'].setValue("lauren");
    expect(component.registerFormGroup.valid).toBeTruthy();

    
    // Trigger the register function
    component.register();
    var user = JSON.parse(localStorage.getItem('user'));

    // Now we can check to make sure the emitted value is correct
    expect(user.email).toBe("lauren@test.com");
    expect(user.displayName).toBe("lauren");
  });

  
  
});

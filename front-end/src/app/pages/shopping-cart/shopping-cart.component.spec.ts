import { ComponentFixture, TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatSnackBarModule } from "@angular/material/snack-bar/";

import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        MatSnackBarModule,
      ],
      declarations: [ ShoppingCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('list field validity', () => {
    let ingredient = component.shoppingCartFormGroup.get("listItem").value;
    expect(ingredient.valid).toBeFalsy(); 
  });

  //add an ingredient to sjopping list
  it('list content field validity', () => {
    component.shoppingCartFormGroup.controls['listItem'].setValue("ham");

    component.addToList(component.shoppingCartFormGroup.value);

    expect(component.listItems).toEqual("ham");
  });
});

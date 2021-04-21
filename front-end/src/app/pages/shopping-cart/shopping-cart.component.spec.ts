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

    expect(component.listItems).toEqual([ Object({ listItem: 'ham', amount: 1  }) ]);
  });

  //add multiple ingredients to sjopping list
  it('multiple list content field validity', () => {
    component.shoppingCartFormGroup.controls['listItem'].setValue("ham");
    component.addToList(component.shoppingCartFormGroup.value);

    component.shoppingCartFormGroup.controls['listItem'].setValue("cheese");
    component.addToList(component.shoppingCartFormGroup.value);

    component.shoppingCartFormGroup.controls['listItem'].setValue("eggs");
    component.addToList(component.shoppingCartFormGroup.value);

    expect(component.listItems[0]).toEqual(Object({ listItem: 'ham', amount: 1 }) );
    expect(component.listItems[1]).toEqual(Object({ listItem: 'cheese', amount: 1  }) );
    expect(component.listItems[2]).toEqual(Object({ listItem: 'eggs', amount: 1  }) );
  });

  //valid delete list item
  it('list content delete validity', () => {
    component.shoppingCartFormGroup.controls['listItem'].setValue("ham");

    component.addToList(component.shoppingCartFormGroup.value);
    component.deleteFromList(0);

    expect(component.listItems).toEqual([  ]);
  });

  //valid delete list item
  it('list content delete from list of multiple validity', () => {
    component.shoppingCartFormGroup.controls['listItem'].setValue("eggs");
    component.addToList(component.shoppingCartFormGroup.value);
    
    component.shoppingCartFormGroup.controls['listItem'].setValue("ham");
    component.addToList(component.shoppingCartFormGroup.value);

    component.shoppingCartFormGroup.controls['listItem'].setValue("cheese");
    component.addToList(component.shoppingCartFormGroup.value);

    component.deleteFromList(2);
    expect(component.listItems[0]).toEqual(Object({ listItem: 'eggs', amount: 1 }));
    expect(component.listItems[1]).toEqual(Object({ listItem: 'ham', amount: 1 }));
  });

});

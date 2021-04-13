import { ComponentFixture, TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from "@angular/material/snack-bar/";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        RouterTestingModule,
        MatSnackBarModule,
        HttpClientModule
      ],
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ingredient field validity', () => {
    let ingredient = component.ingredientFormGroup.get("ingredient").value;
    expect(ingredient.valid).toBeFalsy(); 
  });

  //add an ingredient
  it('ingredient field validity', () => {
    component.ingredientFormGroup.controls['ingredient'].setValue("ham");

    component.addIngredient(component.ingredientFormGroup.value);

    expect(component.ingredients).toEqual([ Object({ ingredient: 'ham', checked: '' }) ] );
  });

  //valid checked ingredient
  it('checkbox field validity', () => {
    component.ingredientFormGroup.controls['ingredient'].setValue("ham");
    

    component.addIngredient(component.ingredientFormGroup.value);
    component.ingredients[0].checked = true;
    component.getCheckboxes();

    expect(component.ingredients).toEqual([ Object({ ingredient: 'ham', checked: true }) ] );
  });

  //valid radio button
  it('radio button (diet) validity', () => {
    //should be done to begin with 
    expect(component.dietPreference).toEqual("None");
    //simulating button click
    //since it changes when chnage is detected
    component.dietPreference = "Vegan";
    expect(component.dietPreference).toEqual("Vegan");

    component.dietPreference = "None";
    expect(component.dietPreference).toEqual("None");
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from "@angular/material/snack-bar/";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


import { SearchComponent } from './search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        HttpClientModule,
        BrowserAnimationsModule
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

  //valid delete list item
  it('list ingredient delete validity', () => {
    component.ingredientFormGroup.controls['ingredient'].setValue("ham");

    component.addIngredient(component.ingredientFormGroup.value);
    component.deleteIngredient(0, component.ingredientFormGroup.value, component.ingredients)

    expect(component.ingredients).toEqual([  ]);
  });

  //valid delete from list of ingredients
  it('list content delete from list of multiple validity', () => {
    component.ingredientFormGroup.controls['ingredient'].setValue("eggs");
    component.addIngredient(component.ingredientFormGroup.value);
    
    component.ingredientFormGroup.controls['ingredient'].setValue("ham");
    component.addIngredient(component.ingredientFormGroup.value);

    component.ingredientFormGroup.controls['ingredient'].setValue("cheese");
    component.addIngredient(component.ingredientFormGroup.value);

    component.deleteIngredient(2, component.ingredientFormGroup.value, component.ingredients)
    expect(component.ingredients[0]).toEqual(Object({ ingredient: 'eggs', checked: '' }));
    expect(component.ingredients[1]).toEqual(Object({ ingredient: 'ham', checked: null }));
  });

  //checking valid search
  //valid delete from list of ingredients
  it('valid search with ingredient list', () => {
    component.ingredientFormGroup.controls['ingredient'].setValue("eggs");
    component.addIngredient(component.ingredientFormGroup.value);
    
    component.ingredientFormGroup.controls['ingredient'].setValue("ham");
    component.addIngredient(component.ingredientFormGroup.value);
    component.ingredients[1].checked = true;

    component.ingredientFormGroup.controls['ingredient'].setValue("cheese");
    component.addIngredient(component.ingredientFormGroup.value);
    component.ingredients[2].checked = true;
    component.getCheckboxes();

    let result = component.searchRecipesByQuery(component.dietPreference, component.selectedIngredients);
    console.log(result);
    expect(result).toBeTruthy();
  });
});

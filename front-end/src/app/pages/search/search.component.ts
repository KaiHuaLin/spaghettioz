import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  ingredientFormGroup: FormGroup;
  ingredients = [];

  constructor() { 
    this.ingredientFormGroup = new FormGroup(
      {
        ingredient: new FormControl(""),
      },
      Validators.required
    );
    
  }

  ngOnInit(): void {
  }
  
  //adds ingredient
  addIngredient(ingredient){
    this.ingredients.push(ingredient);
    this.ingredientFormGroup.reset();
    console.log(ingredient);
    console.log(this.ingredients);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {RecipeService} from '../../service/recipe/recipe.service';
import { Query } from '../../models/Query'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  ingredientFormGroup: FormGroup;

  constructor(private recipe: RecipeService) { 
    this.ingredientFormGroup = new FormGroup(
      {
        ingredient: new FormControl(""),
      },
      Validators.required
    );
  }

  ngOnInit(): void {
  }

  async addIngredient() {
    
  }

  // examples
  async searchRecipeById() {
    const recipeID = "716429";

    try {
      const recipe = await this.recipe.get_recipe_by_id(recipeID);
      console.log(recipe);
    }
    catch {
      console.log("errorrrrrrrrrrr");
    }
  }

  // examples
  async searchRecipesByQuery() {
    const query: Query = {
      includeIngredients: "tomato,cheese",
    } 

    try {
      const recipes = await this.recipe.get_recipe_by_query(query);
      console.log(recipes);
    }
    catch {
      console.log("errorrrrrrrrrrr");
    }
  }
}

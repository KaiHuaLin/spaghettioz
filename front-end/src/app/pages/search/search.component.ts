import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../service/recipe/recipe.service';
import { RecipePreviewService } from '../../service/db/recipe-preview.service';
import { Query } from '../../models/Query';
import { Recipe } from '../../models/Recipe';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  ingredientFormGroup: FormGroup;
  ingredients = [];

  dietPreference: string;
  diets: string[] = ['Vegetarian', 'Vegan', 'Gluten Free', 'Dairy Free', "None"];

  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor(private recipe: RecipeService, private recipePreview: RecipePreviewService) { 
    this.ingredientFormGroup = new FormGroup(
      {
        ingredient: new FormControl(""),
      },
      Validators.required
    );
    
  }

  ngOnInit(): void {
  }

  //favorite/unfavorite. doesn't work completely yet since it needs to be tied with w/recipe id to not select all the icons
  toggleSelected() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

  //adds ingredient
  addIngredient(ingredient){
    this.ingredients.push(ingredient);
    this.ingredientFormGroup.reset();
    console.log(ingredient);
    console.log(this.ingredients);
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

  // example
  createPreviewRecipe() {
    const recipe: Recipe = {
      id: "716429",
      image: "https://spoonacular.com/recipeImages/715538-312x231.jpg",
      title: "What to make for dinner tonight?? Bruschetta Style Pork & Pasta",
    }

    this.recipePreview.create_recipe(recipe);
  }

  // example
  async getRecipe() {
    const recipe = await this.recipePreview.get_recipe_by_id("716429");
    console.log(recipe);
  }
}

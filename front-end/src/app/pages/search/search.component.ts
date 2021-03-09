import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../service/recipe/recipe.service';
import { RecipePreviewService } from '../../service/db/recipe-preview.service';
import { Query } from '../../models/Query';
import { Recipe } from '../../models/Recipe';
import { DbService } from '../../service/db/db.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  ingredientFormGroup: FormGroup;
  ingredients = [];
  selectedIngredients = [];
  viewrecipe = [];
  tempviewrecipe = [];


  //Variables for paginator
  pageIndex: number = 0;
  pageSize: number = 2;
  lowValue: number = 0;
  highValue: number = 2;

  dietPreference: string;
  diets: string[] = ['Vegetarian', 'Vegan', 'Gluten Free', 'Dairy Free', "None"];

  constructor(private AuthService: AuthService, private Db: DbService,private recipe: RecipeService, private recipePreview: RecipePreviewService) { 
  }

  ngOnInit(): void {
  }
  //favorites a specific recipe
  favorite(id: string) {
    document.getElementById(id).style.color = "red";
    this.updateFavorite(document.getElementById(id));
  }
  //<<to be implemented>> add Flist by importing Favorite.component and have fList as a global variable
  //<<to be implemented>> update fList in favorite function and call updateFavorite
  // update favorite updates user favorite array <<paramitor string array>>
  private async updateFavorite(str){
    const currentUser = await this.AuthService.getCurrentUser();
    const dbUser = await this.Db.get_user(currentUser.uid);
    var list = dbUser.favorite;
    list.push(str)
    await this.Db.update_user(dbUser.uid, {favorite:list});
 }

  //for the paginator
  public getPaginator(event){
    if(event.pageIndex === this.pageIndex + 1){
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue = this.highValue + this.pageSize;
    }
    else if(event.pageIndex === this.pageIndex - 1){
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue = this. highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }

  //get value of checkboc
  getCheckboxes() {
    this.selectedIngredients = this.ingredients.filter(x => x.checked === true).map(x => x.ingredient);
  }

  //adds ingredient
  addIngredient(ingredient){
    console.log(ingredient);
    this.ingredients.push(ingredient);
    this.ingredientFormGroup.reset();
    //console.log(this.ingredients);
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
  async searchRecipesByQuery(diet, ingredients) {
    const query: Query = {
      includeIngredients: ingredients,
    } 

    try {
      const recipes = await this.recipe.get_recipe_by_query(query);
      const results = recipes.results;
      results.forEach(element => {
        console.log(element.id.toString());
        this.createPreviewRecipe(element.id.toString(), element.image.toString(), element.title.toString());
        this.getRecipe(element.id.toString());
      });
      this.viewrecipe = this.tempviewrecipe;

    }
    catch {
      console.log("errorrrrrrrrrrr");
    }
  }

  // example
  createPreviewRecipe(id: string, image, title) {
    const recipe: Recipe = {
      id: id,
      image: image,
      title: title,
    }
    this.recipePreview.create_recipe(recipe);
  }

  // example
  async getRecipe(id) {
    const recipe = await this.recipePreview.get_recipe_by_id(id);
    this.tempviewrecipe.push(recipe);
  }


    // async user(){
    //   //1)access user
    //   const AuthService= AuthService;
    //   const Db= DbService;
    //   const currentUser = await AuthService.getCurrentUser();
    //   //2)get ingredient list
    //   //3)populate ingredients
    // }
}

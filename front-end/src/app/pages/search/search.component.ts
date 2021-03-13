
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../service/recipe/recipe.service';
import { RecipePreviewService } from '../../service/db/recipe-preview.service';
import { Query } from '../../models/Query';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Recipe } from '../../models/Recipe';
import { DbService } from '../../service/db/db.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { FavoriteComponent } from '../favorite/favorite.component';

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
  

  //Variables for paginator
  pageIndex: number = 0;
  pageSize: number = 2;
  lowValue: number = 0;
  highValue: number = 2;

  fList = [];

  dietPreference: string;
  diets = [{name:'Vegetarian', checked: false},{name:'Vegan', checked: false},{name:'Gluten Free', checked: false},{name:'Dairy Free', checked: false},{name:'None', checked: true}];

  constructor(private AuthService: AuthService, private snackBar: MatSnackBar, private Db: DbService,private recipe: RecipeService, private recipePreview: RecipePreviewService) { 
    this.ingredientFormGroup = new FormGroup(
      {
        ingredient: new FormControl(""),
        checked:new FormControl("")
      },
      Validators.required
    );
    this.dietPreference = 'None';
    this.getFavorite();
    this.setupPantry();
  }

  ngOnInit(): void {
    //
  }

  //favorites a specific recipe
  favorite(id: string) {
    //unfavorite 
    //still need logic to connect recipe to user
    if(document.getElementById(id).style.color == "red"){
      document.getElementById(id).style.color = "black";
      this.removeFromFavorite( document.getElementById(id).id);
    }
    //favorite recipe
    //also needs logic
    else if(document.getElementById(id).style.color == "black"){
      document.getElementById(id).style.color = "red";
      this.addToFavorite(document.getElementById(id).id);
    }
  }

  async getFavorite() {
    // get current user
    const currentUser = await this.AuthService.getCurrentUser();
    // get user in db so that you can get or write favorite field
    const dbUser = await this.Db.get_user(currentUser.uid);
    dbUser.favorite.forEach(async element =>{
      const temp = await this.recipePreview.get_recipe_by_id(element);
      this.fList.push(temp);
    });
  }
  
  //<<to be implemented>> add Flist by importing Favorite.component and have fList as a global variable
  //<<to be implemented>> update fList in favorite function and call updateFavorite
  // update favorite updates user favorite array <<paramitor string array>>
  private async addToFavorite(str){
    const currentUser = await this.AuthService.getCurrentUser();
    const dbUser = await this.Db.get_user(currentUser.uid);
    var list = dbUser.favorite;
    if (list.indexOf(str) <= -1){
      list.push(str);
    }
    await this.Db.update_user(dbUser.uid, {favorite:list});
 }

  private async removeFromFavorite(str){
    const currentUser = await this.AuthService.getCurrentUser();
    const dbUser = await this.Db.get_user(currentUser.uid);
    var list = dbUser.favorite;
    const index = list.indexOf(str);
    if (index > 1){
      list.splice(index,1);
    }
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
  // unCheckboxes(){
  //   this.selectedIngredients = this.ingredients.filter(x => x.checked === false).map(x => x.ingredient);
  // }

  deleteIngredient(index, ingredient, ingredients){
    if(this.selectedIngredients.length > 0){
      this.selectedIngredients.forEach(element =>{
        if(element === ingredient.ingredient){
          this.selectedIngredients.splice(index, 1);
        }
      });
    }
    ingredients.splice(index, 1);
    this.updatePantry()
  }

  //adds ingredient
  addIngredient(ingredient){
    console.log(ingredient);
    this.ingredients.push(ingredient);
    this.ingredientFormGroup.reset();
    
    // update pantry
    this.updatePantry()
  }

  // update user pantry
  async updatePantry() {
    const authUser = await this.AuthService.getCurrentUser();
    const uid = authUser.uid;
    this.Db.update_user(uid, {pantry: this.ingredients});
  }

  //get pantry
  async setupPantry() {
    const authUser = await this.AuthService.getCurrentUser();
    const uid = authUser.uid;
    const dbUser = await this.Db.get_user(uid);
    const pantry = dbUser.pantry;
    console.log(pantry);

    this.ingredients = pantry;
    
    this.ingredients.forEach(ingredient => {
      if (ingredient.checked === true) {
        this.selectedIngredients.push(ingredient.ingredient);
      }
    })
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
    console.log(diet);
    console.log(ingredients);
    if(ingredients.length == 0){
      this.snackBar.open("Please select an ingredient to search", null, { duration: 4000});
      return;
    }
    if(this.viewrecipe.length != 0){
      this.viewrecipe = [];
    }

    // concante each ingrediants with comma, which is required by the spoonacular Query
    let ingredientList = "";
    ingredients.forEach(ingredient => {
      ingredientList += ingredient + ",";
    });

    const query: Query = {
      // includeIngredients: ingredientList, 
      ingredients: ingredientList,
    } 

    try {
      const recipes = await this.recipe.get_recipe_by_query(query);
      // const results = recipes.results;
      if (recipes.length !== 0) {
        recipes.forEach(element => {
          console.log(element.id.toString());
          this.createPreviewRecipe(element.id.toString(), element.image.toString(), element.title.toString());
          this.getRecipe(element.id.toString());
        });
      } else {
        console.log("no result");
      }
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
    //formats it so that the recipes will be able to display if they are favorited or not
    this.viewrecipe.push({id: recipe.id, image: recipe.image, title: recipe.title, favorite: false});
    this.fList.forEach(element =>{
      //finds the favorite and sets true
      if(element.id == recipe.id){
        const index = this.viewrecipe.indexOf(recipe.id);
            this.viewrecipe.splice(index,1);
            this.viewrecipe.push({id: recipe.id, image: recipe.image, title: recipe.title, favorite: true});
          }
    });
    console.log(this.viewrecipe);
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

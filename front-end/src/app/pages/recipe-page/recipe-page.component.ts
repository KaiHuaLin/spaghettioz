import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/service/db/db.service';
import { RecipeService } from 'src/app/service/recipe/recipe.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit, OnDestroy {

  viewrecipe;
  id: number;
  private sub: any;
  ingredientList = [];

  constructor(private recipe: RecipeService, private route: ActivatedRoute, private AuthService: AuthService, private Db: DbService) { 
    
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      this.viewRecipe(this.id.toString());
   });
   this.getShoppingCart();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async viewRecipe(recipeId: string) {
    this.viewrecipe = await this.recipe.get_recipe_by_id(recipeId);
    console.log(this.viewrecipe);
  }

  async addToList(){
    var content = this.viewrecipe.analyzedInstructions;
    content.forEach(element => {
      for(var k = 0; k < 1; k++){
        element.steps[k].ingredients.forEach(element => {
          var name = element.name;
          this.ingredientList.push({listItem:name});
        });
      }
    });
    console.log(this.ingredientList);

    const currentUser = await this.AuthService.getCurrentUser();
  
    await this.Db.update_user(currentUser.uid, {shoppingCart:this.ingredientList});
  }

  async getShoppingCart() {
    const currentUser = await this.AuthService.getCurrentUser();
    const dbUser = await this.Db.get_user(currentUser.uid);
    if(dbUser.shoppingCart){
      this.ingredientList = dbUser.shoppingCart
    }
    }
}

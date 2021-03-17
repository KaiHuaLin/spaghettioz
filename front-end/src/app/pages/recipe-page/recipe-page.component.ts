import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/service/recipe/recipe.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit, OnDestroy {

  viewrecipe;
  id: number;
  private sub: any;

  constructor(private recipe: RecipeService, private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      this.viewRecipe(this.id.toString());
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async viewRecipe(recipeId: string) {
    this.viewrecipe = await this.recipe.get_recipe_by_id(recipeId);
    console.log(this.viewrecipe);
  }

}

import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Query } from '../../models/Query';

import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let service: RecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(RecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get recipe by id', () => {
    // use id null = failure;
    // let recipe = service.get_recipe_by_id("abcdef");
    // expect(recipe).toBeNull();
    
    // use id 104000 = 'Eggplant Parmesan'
    let recipe = service.get_recipe_by_id('104000');
    expect(recipe).toBeTruthy();
    console.log(recipe);
  });

  it('get recipe by query', async () => {
    let ingredientList = "beans,rice,tomato";

    const query: Query = {
      // includeIngredients: ingredientList, 
      ingredients: ingredientList,
    }

    const recipes = await service.get_recipe_by_query(query);
    // console.log('get recipe by query test');
    // console.log(recipes);
    expect(recipes.length).toBeGreaterThan(0);
  });
});

import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { RecipePreviewService } from './recipe-preview.service';

describe('RecipePreviewService', () => {
  let service: RecipePreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ]
    });
    service = TestBed.inject(RecipePreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create recipe & get by id & delete', async () => {
    //create a test recipe in fire store, then check to see if it's in there.
    await service.create_recipe({id:'555', image:'https://www.awesomeinventions.com/wp-content/uploads/2020/03/Ikiru-the-Cat.jpg', title:'blep cat'})
    // this doesn't delete recipe 555, but it works if 555 is manually deleted
    let recipe = service.get_recipe_by_id('555');
    expect(recipe).toBeTruthy();
    console.log(recipe);
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
});

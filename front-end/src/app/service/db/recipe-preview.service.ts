import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Recipe } from '../../models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipePreviewService {
  recipesCollection: AngularFirestoreCollection<Recipe>;
  recipes: Observable<Recipe[]>

  constructor(private db: AngularFirestore) { 
    this.recipesCollection = this.db.collection('recipes');
    this.recipes = this.db.collection<Recipe>('recipes').valueChanges();
  }

  create_recipe(recipe: Recipe) {
    this.recipesCollection.doc(recipe.id).set(recipe);
  }

  async get_recipe_by_id(id: string) {
    const recipe = await this.recipesCollection.doc(id).ref.get();
    if (recipe.exists) {
      console.log("Firestore: get recipe: " + id);
      return recipe.data();
    } else {
      console.log("Firestore: Recipe does not exist!");
      return null;
    }
  }
}

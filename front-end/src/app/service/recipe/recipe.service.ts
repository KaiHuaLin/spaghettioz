import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Query } from '../../models/Query'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private SPOONACULAR_APIKEY = "cc92bef7e1614c729dcb928780b22d26";
  private SPOONACULAR_URL = "https://api.spoonacular.com";

  constructor(private http: HttpClient) {}

  // get recipe by id
  async get_recipe_by_id(id: string) {
    const recipe: any = await this.http.get(`${this.SPOONACULAR_URL}/recipes/${id}/information?apiKey=${this.SPOONACULAR_APIKEY}`).toPromise();
    return recipe;
  }

  // get recipe by query
  async get_recipe_by_query(query: Query) {
    const params = new HttpParams({fromObject: {
      ...query,
      apiKey: this.SPOONACULAR_APIKEY,
    }});

    const recipes: any = await this.http.get(`${this.SPOONACULAR_URL}/recipes/complexSearch`, {params}).toPromise();
    return recipes;
  }
}

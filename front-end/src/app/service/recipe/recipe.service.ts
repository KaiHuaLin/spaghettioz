import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private SPOONACULAR_APIKEY = "cc92bef7e1614c729dcb928780b22d26";
  private SPOONACULAR_URL = "https://api.spoonacular.com";

  constructor(private http: HttpClient) {}

  get_recipe_by_id(id: string) {
    this.http.get(`${this.SPOONACULAR_URL}/recipes/${id}/information?apiKey=${this.SPOONACULAR_APIKEY}`)
  }
}

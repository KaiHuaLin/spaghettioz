import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/Recipe';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DbService } from '../../service/db/db.service';
import { RecipePreviewService } from '../../service/db/recipe-preview.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  
  fList = [];
  constructor(private AuthService: AuthService, private Db: DbService, private RecipePreview: RecipePreviewService, private router: Router) {
   }
  
  ngOnInit(): void {
    this.getFavorite();
    console.log(this.fList);
  }

  async getFavorite() {
    // get current user
    const currentUser = await this.AuthService.getCurrentUser();
    // get user in db so that you can get or write favorite field
    const dbUser = await this.Db.get_user(currentUser.uid);
    // console.log(dbUser.favorite);
    // const preview1 = await this.RecipePreview.get_recipe_by_id(dbUser.favorite[0])
    dbUser.favorite.forEach(async element =>{
      const temp = await this.RecipePreview.get_recipe_by_id(element);
      this.fList.push(temp);
      // console.log(temp);   
    });
    // console.log(this.fList);
  }

  async updateFavorite(){
    const currentUser = await this.AuthService.getCurrentUser();
    const dbUser = await this.Db.get_user(currentUser.uid);
    await this.Db.update_user(dbUser.uid, {favorite:this.fList});
    console.log(this.fList);
  }

}

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

  constructor(private AuthService: AuthService, private Db: DbService, private RecipePreview: RecipePreviewService, private router: Router) {
   }

  ngOnInit(): void {
    this.getFavorite();
  }

  async getFavorite() {
    // get current user
    const currentUser = await this.AuthService.getCurrentUser();
    // console.log(currentUser);

    // get user in db so that you can get or write favorite field
    const dbUser = await this.Db.get_user(currentUser.uid);
    // console.log(dbUser);
    // console.log(dbUser.favorite);
    // const preview1 = await this.RecipePreview.get_recipe_by_id(dbUser.favorite[0])
    var fList = [];
    dbUser.favorite.forEach(async element =>{
      const temp = await this.RecipePreview.get_recipe_by_id(element);
      fList.push(temp);   
    });
    
    console.log(fList);
    
    // for (let i = 0; i < dbUser.favorite.length; i++ ) {
      
    //   // console.log(dbUser.favorite[i])
    // }
    
    // need to properly parse array in future, for loop?
  }

}

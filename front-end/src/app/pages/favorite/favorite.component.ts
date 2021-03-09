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

    //Variables for paginator
    pageIndex: number = 0;
    pageSize: number = 1;
    lowValue: number = 0;
    highValue: number = 1;

  constructor(private AuthService: AuthService, private Db: DbService, private RecipePreview: RecipePreviewService, private router: Router) {
   }
  
  ngOnInit(): void {
    this.getFavorite();
    console.log(this.fList);
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

  async getFavorite() {
    // get current user
    const currentUser = await this.AuthService.getCurrentUser();
    // get user in db so that you can get or write favorite field
    const dbUser = await this.Db.get_user(currentUser.uid);
    dbUser.favorite.forEach(async element =>{
      const temp = await this.RecipePreview.get_recipe_by_id(element);
      this.fList.push(temp);
    });
  }

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

}

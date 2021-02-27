import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import {DbService} from '../../service/db/db.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  constructor(private AuthService: AuthService, private Db: DbService, private router: Router) {
   }

  ngOnInit(): void {
    this.getFavorite();
  }

  async getFavorite() {
    // get current user
    const currentUser = await this.AuthService.getCurrentUser();
    console.log(currentUser);

    // get user in db so that you can get or write favorite field
    const dbUser = await this.Db.get_user(currentUser.uid);
    console.log(dbUser);
  }
}

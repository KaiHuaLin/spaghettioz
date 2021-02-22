import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {
   }

  ngOnInit(): void {
    if(this.auth.checkSignInStatus === true){
      this.router.navigate(['home']);
    }
  }

}

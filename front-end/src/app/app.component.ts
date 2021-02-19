import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end';

  constructor(public auth: AuthService, public router : Router){
  }

  logout(){
    this.auth.signOut();
    this.router.navigate(['home']);
  }
}

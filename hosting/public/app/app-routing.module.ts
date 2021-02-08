import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'favorite',
    component: FavoriteComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

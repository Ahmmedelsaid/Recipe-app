import { Component, OnInit } from '@angular/core';
import { recipeService } from './recipe.service';
import { AuthService } from './auth/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Recipe-app';
  constructor(
    private recipeService: recipeService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    // Check if recipes exist in local storage
    // const recipesInLocalStorage = localStorage.getItem('recipes');
    // if (recipesInLocalStorage) {
    //   const recipes = JSON.parse(recipesInLocalStorage);
    //   this.recipeService.setRecipes(recipes);
    // }
    this.authService.autoLogin();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { recipeService } from './recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { Recipe } from './recipes/recipe.model';
import { AuthService } from './auth/auth/auth.service';

@Injectable()
export class RecipeStorage {
  isFetching = false;
  constructor(
    private http: HttpClient,
    private recipeService: recipeService,
    private AuthService: AuthService
  ) {}
  SaveRecipe() {
    const recipes = this.recipeService.getRecipes();
    return this.AuthService.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http.put(
            'https://recipe-angular-app-4298a-default-rtdb.firebaseio.com/recipes.json?auth=' +
              user?.token,
            recipes
          );
        })
      )

      .subscribe((response) => {
        console.log(response);
      });
  }
  FetchRecipe() {
    this.isFetching = true;
    return this.AuthService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(
          'https://recipe-angular-app-4298a-default-rtdb.firebaseio.com/recipes.json?auth=' +
            user?.token
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((response) => {
        this.isFetching = false;
        this.recipeService.setRecipes(response);
        // localStorage.setItem('recipes', JSON.stringify(response));
      })
    );
  }
  Clear() {
    this.http
      .delete(
        'https://recipe-angular-app-4298a-default-rtdb.firebaseio.com/recipes.json'
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}

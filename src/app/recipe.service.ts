import { ingredients } from './inredients.model';
import { Recipe } from './recipes/recipe.model';
import { Injectable } from '@angular/core';
import { shoppingService } from './shoppinglist.service';
import { Subject } from 'rxjs';

@Injectable()
export class recipeService {

  RecipeChanged = new Subject<Recipe[]>();
  private Recipes: Recipe[] = [];
  // new Recipe(
  //   'Smash burger',
  //   'Savor perfection in every bite with our irresistible Burger Sandwich. Juicy beef patty, fresh veggies, melted cheese, and our secret sauce combine within fluffy buns for a taste that is pure satisfaction.',
  //   'https://www.labreabakery.com/sites/default/files/styles/recipe/public/2017-03/All-American-Cheese-Burger_NoPickles-HR.jpg?itok=njkB80E2',
  //   [
  //     new ingredients('Juicy beef patty', 1),
  //     new ingredients('Fluffy buns', 1),
  //     new ingredients('slices American cheese', 1),
  //     new ingredients('Large Red Onion', 1),
  //   ]
  // ),
  // new Recipe(
  //   'Pancake',
  //   'Embrace morning comfort with our Fluffy Pancakes. Delicate, golden-brown layers, soft as a whisper, stacked high and drizzled with maple syrup—a timeless indulgence for your senses.',
  //   'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //   [
  //     new ingredients('Strawberry', 2),
  //     new ingredients('Maple syrup', 1),
  //     new ingredients('Sauce Caramel', 1),
  //   ]
  // ),
  // new Recipe(
  //   'Chicken Wrap',
  //   'My favorite Buffalo Chicken Wrap includes juicy buffalo chicken layered on crunchy fresh veggies, topped with cheese and creamy dressing and wrapped tightly in a delicious flour tortilla. ',
  //   'https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Wrap-750x750.jpg',
  //   [
  //     new ingredients('tortilla', 1),
  //     new ingredients('chicken breasts', 1),
  //     new ingredients('shredded cheddar cheese', 1 / 2),
  //   ]
  // ),

  constructor(private slService: shoppingService) {}
  setRecipes(recipe: Recipe[]) {
    this.Recipes = recipe;
    this.RecipeChanged.next(this.Recipes.slice());
  }
  getRecipes() {
    return this.Recipes.slice();
  }
  getRecipe(index: number) {
    return this.Recipes[index];
  }
  addingreients(Ingredients: ingredients[]) {
    this.slService.addingredients(Ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.Recipes.push(recipe);
    this.RecipeChanged.next(this.Recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.Recipes[index] = newRecipe;
    this.RecipeChanged.next(this.Recipes.slice());
  }
  deleteRecipe(index: number) {
    this.Recipes.splice(index, 1);
    this.RecipeChanged.next(this.Recipes.slice());
  }
}

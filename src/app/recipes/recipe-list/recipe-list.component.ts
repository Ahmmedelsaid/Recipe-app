import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { recipeService } from 'src/app/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeStorage } from 'src/app/Recipe-storage.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  Recipes!: Recipe[];
  subscription!: Subscription;

  constructor(
    private RecipeService: recipeService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: RecipeStorage
  ) {}
  isFetching = this.storage.isFetching;
  ngOnInit(): void {
    this.subscription = this.RecipeService.RecipeChanged.subscribe(
      (recipe: Recipe[]) => {
        this.Recipes = recipe;
      }
    );
    this.Recipes = this.RecipeService.getRecipes();
  }
  onAddRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

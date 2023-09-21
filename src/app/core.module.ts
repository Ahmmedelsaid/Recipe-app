import { NgModule } from "@angular/core";
import { shoppingService } from "./shoppinglist.service";
import { recipeService } from "./recipe.service";
import { RecipeStorage } from "./Recipe-storage.service";

@NgModule({
  providers:[shoppingService, recipeService, RecipeStorage]
})
export class CoreModule{ }

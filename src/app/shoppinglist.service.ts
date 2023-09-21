import { ingredients } from './inredients.model';
import { Subject } from 'rxjs';
export class shoppingService {
  ingredo = new Subject<ingredients[]>();
  startedEdit = new Subject<number>();
  private Ingredients: ingredients[] = [
    new ingredients('Salt', 2),

    new ingredients('pipper', 3),
  ];
  getIngredient(index: number) {
    return this.Ingredients[index];
  }
  getIngredients() {
    return this.Ingredients.slice();
  }
  adIngredient(ingredients: ingredients) {
    this.Ingredients.push(ingredients);
    this.ingredo.next(this.Ingredients.slice());
  }
  addingredients(ingredients: ingredients[]) {
    this.Ingredients.push(...ingredients);
    this.ingredo.next(this.Ingredients.slice());
  }
  updateIngerdient(index: number, newIngred: ingredients) {
    this.Ingredients[index] = newIngred;
    this.ingredo.next(this.Ingredients.slice());
  }
  deleteIngredient(index: number) {
    this.Ingredients.splice(index, 1);
    this.ingredo.next(this.Ingredients.slice());
  }
}

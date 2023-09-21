import { ingredients } from '../inredients.model';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: ingredients[];
  constructor(
    name: string,
    desc: string,
    image: string,
    igredo: ingredients[]
  ) {
    this.name = name;
    this.description = desc;
    this.imagePath = image;
    this.ingredients = igredo;
  }
}

import { Recipe } from '../models/recipe.model';
import { Ingredient } from "../models/shopping-list.model";

export class RecipeService {
  private recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes.slice();
  }

  addRecipe(title: string, difficulty: string, description: string,  ingredients: Ingredient[]) {
    this.recipes.push(
      new Recipe(
        title,
        difficulty,
        description,
        ingredients
      ));
  }

  updateRecipe(index: number,
               title: string,
               difficulty: string,
               description: string,
               ingredients: Ingredient[]) {
    this.recipes[index] =
      new Recipe(title, difficulty, description, ingredients);
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

}

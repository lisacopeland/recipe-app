import { Ingredient } from "../models/shopping-list.model";

export class ShoppingListService {
  private shoppingList: Ingredient[] = [];

  getShoppingList() {
    return this.shoppingList.slice();
  }

  addIngredient(name: string, amount: number) {
    console.log('hi from addingredient');
    this.shoppingList.push(
      new Ingredient(name, amount));
    console.log(this.shoppingList);
  }

  addIngredients(ingredients: Ingredient[]) {
    // Use the spread operator
    this.shoppingList.push(...ingredients);
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient.name, ingredient.amount);
    // }
  }

  removeIngredient(ingredient: Ingredient) {
    const idx = this.shoppingList.findIndex(x => ingredient.name === x.name);
    this.shoppingList.splice(idx, 1);
    }

  updateQuantity(ingredient: Ingredient, amount: number) {
    const idx = this.shoppingList.findIndex(x => ingredient.name === x.name);
    this.shoppingList[idx].amount = amount;
  }

}

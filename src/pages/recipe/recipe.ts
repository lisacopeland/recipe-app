import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {Recipe} from "../../models/recipe.model";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {RecipeService} from "../../services/recipe.service";
import {ShoppingListService} from "../../services/shopping-list.service";

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {

  recipe: Recipe;
  recipeIndex: number;

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private shoppingListService: ShoppingListService,
              private recipeService: RecipeService) {}

  ngOnInit() {
      this.recipe = this.navParams.get('recipe');
      this.recipeIndex = this.navParams.get('index');
  }

  onAddIngredients() {
      this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onEdit() {
      this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.recipeIndex});
  }

  onDelete() {
      this.recipeService.removeRecipe(this.recipeIndex);
      this.navCtrl.popToRoot();
  }

}

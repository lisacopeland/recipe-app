import {Component, OnInit} from '@angular/core';
import {NavController} from "ionic-angular";

import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {RecipeService} from "../../services/recipe.service";
import {Recipe} from "../../models/recipe.model";
import {RecipePage} from "../recipe/recipe";

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(private navCtrl: NavController,
              private recipeService: RecipeService) {}

  ionViewWillEnter() {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
      this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(recipe, idx) {
      this.navCtrl.push(RecipePage, {index: idx, recipe: this.recipes[idx]});
  }

}

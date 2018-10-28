import {Component, OnInit} from '@angular/core';
import { NgForm } from "@angular/forms";

import { ShoppingListService } from "../../services/shopping-list.service";
import { Ingredient } from "../../models/shopping-list.model";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage implements OnInit {
    shoppingList: Ingredient[];

    constructor(private shoppingListService: ShoppingListService) {}

    ngOnInit() {
        this.loadItems();
    }

    onAddItem(form: NgForm) {
      console.log(form);
      this.shoppingListService.addIngredient(form.value.ingredientName, form.value.ingredientAmount);
      console.log('did add ingredient');
      form.reset();
      this.loadItems();
    }

    onDeleteItem(ingredient) {
      this.shoppingListService.removeIngredient(ingredient);
      this.loadItems();
    }

    loadItems() {
      this.shoppingList = this.shoppingListService.getShoppingList();
    }

}

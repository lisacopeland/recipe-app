import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, ToastController, NavParams, NavController} from "ionic-angular";
import {FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import {RecipeService} from "../../services/recipe.service";
import {Recipe} from "../../models/recipe.model";

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  recipeForm: FormGroup;
  recipe: Recipe;
  recipeIndex: number;
  mode = 'New';
  difficultyOptions = ['Easy', 'Medium', 'Hard'];

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private toastCtrl: ToastController,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private recipeService: RecipeService) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode !== 'New') {
      this.recipe = this.navParams.get('recipe');
      this.recipeIndex = this.navParams.get('index');
    }
    this.initForm();
  }

  initForm() {
    if (this.mode === 'New') {
      this.recipeForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        difficulty: new FormControl('Easy'),
        ingredients: new FormArray([])
      });
    } else {
      let newArray = [];
      for (let ingredient of this.recipe.ingredients) {
        newArray.push(new FormControl(ingredient.name, Validators.required))
      }
      this.recipeForm = new FormGroup({
        title: new FormControl(this.recipe.title, Validators.required),
        description: new FormControl(this.recipe.description, Validators.required),
        difficulty: new FormControl(this.recipe.difficulty),
        ingredients: new FormArray(newArray)
      });

    }
  }

  onSubmit() {
    console.log(this.recipeForm);
    const value = this.recipeForm.value;
    let ingredients = [];
    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(x =>{
        return { name: x, amount: 1 };
      });
    }
    if (this.mode === 'New') {
      this.recipeService.addRecipe(
        value.title,
        value.difficulty,
        value.description,
        ingredients);
    } else {
      this.recipeService.updateRecipe(
        this.recipeIndex,
        value.title,
        value.difficulty,
        value.description,
        ingredients);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  OnManageIngredients() {
      const actionSheet = this.actionSheetCtrl.create({
        title: 'What do you want to do?',
        buttons: [
          {
            text: 'Add Ingredient',
            handler: () => {
              this.createNewIngredientAlert().present();
            }
          },
          {
            text: 'Remove All Ingredients',
            role: 'destructive',
            handler: () => {
              const formArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
              const len = formArray.length;
              if (len > 0) {
                for (let i = len - 1; i >= 0; i--) {
                  formArray.removeAt(i);
                }
                const toast = this.toastCtrl.create({
                  message: 'All ingredients were deleted',
                  duration: 1000,
                  position: 'bottom'
                });
                toast.present();
              }
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid name',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
              return
            }
            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'Item was added',
              duration: 1000,
              position: 'bottom'
            });
            toast.present();
          }
        }
      ]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

}

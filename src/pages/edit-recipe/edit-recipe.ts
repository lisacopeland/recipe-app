import {Component, OnInit} from '@angular/core';
import { NavParams } from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  recipeForm: FormGroup;
  mode = 'New';
  difficultyOptions = ['Easy', 'Medium', 'Hard'];

  constructor(private navParams: NavParams) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initForm();
  }

  initForm() {
    this.recipeForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      difficulty: new FormControl('Easy')
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

}

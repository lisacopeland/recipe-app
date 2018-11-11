import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Pages
import { MyApp } from './app.component';
import { RecipesPage } from "../pages/recipes/recipes";
import { ShoppingListPage } from "../pages/shopping-list/shopping-list";
import { TabsPage } from "../pages/tabs/tabs";
import { EditRecipePage } from "../pages/edit-recipe/edit-recipe";
import { RecipePage } from "../pages/recipe/recipe";

// Services

import { ShoppingListService } from "../services/shopping-list.service";
import {RecipeService} from "../services/recipe.service";

@NgModule({
  declarations: [
    MyApp,
    RecipesPage,
    ShoppingListPage,
    TabsPage,
    EditRecipePage,
    RecipePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RecipesPage,
    RecipePage,
    EditRecipePage,
    ShoppingListPage,
    TabsPage
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

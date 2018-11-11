import { Ingredient } from './shopping-list.model';

export class Recipe {
  constructor(
    public title: string,
    public difficulty: string,
    public description: string,
    public ingredients: Ingredient[]
    //
   ) {}
}

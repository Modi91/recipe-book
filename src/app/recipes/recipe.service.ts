import { Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      "Italian Grilled Cheese Sandwiches",
      "A super-tasty Grilled Cheese Sandwiches!",
      "https://www.simplyrecipes.com/wp-content/uploads/2019/05/EYF-Italian-Grilled-Cheese-LEAD-4.jpg",
      [new Ingredient("Cheese", 1), new Ingredient("Tomato", 20)]
    ),
    new Recipe(
      "Egg 'n Grilled Cheese Sandwich",
      "The perfect sandwich for any occasion",
      "http://assets.kraftfoods.com/recipe_images/opendeploy/150742-013aabf8ae1af87c29d0029c0d5119acfa07b4db_642x428.jpg",
      [new Ingredient("Egg", 2), new Ingredient("Cheese", 1)]
    ),
    new Recipe(
      "Integral Bread Sandwich with Turkey",
      "What else you need to say?",
      "https://cdn.kiwilimon.com/recetaimagen/16320/th5-640x426-8269.jpg",
      [
        new Ingredient("Bread", 2),
        new Ingredient("Turkey ham", 2),
        new Ingredient("Red onion", 1)
      ]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

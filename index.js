import {recipes} from './recipes.js'
export const recipeList = recipes;

export async function recipesCreation(recipes) {
    const recipesSection = document.querySelector("#recipes_area");
    
    recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });
}

async function init() {
    recipesCreation(recipes);
}

init();
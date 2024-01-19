import { recipeList } from "./index.js";
import { recipesCreation } from "./index.js";
import {filterCreation, recipeFiltered, nbRecipes, recipesSection, searchFilter, noRecipe, 
    filtersFilter, dropDownFunction, myMap} from "./myLib.js"
const inputValidation = document.getElementById('search_area');
const dropDown1 = document.querySelector(".ingredients_area");
const dropDownIcon1 = document.getElementById("pull_down_1");
const chevron1 = document.querySelector("#pull_down_1 .fa-chevron-down");
const ingredientsTitle = document.getElementById("ingredients_title");
const dropDown2 = document.querySelector(".appliance_area");
const dropDownIcon2 = document.getElementById("pull_down_2");
const chevron2 = document.querySelector("#pull_down_2 .fa-chevron-down");
const appareilsTitle = document.getElementById("appareils_title");
const dropDown3 = document.querySelector(".ustensils_area");
const dropDownIcon3 = document.getElementById("pull_down_3");
const chevron3 = document.querySelector("#pull_down_3 .fa-chevron-down");
const ustensilesTitle = document.getElementById("ustensils_title");
nbRecipes.innerText = recipeFiltered.length;

inputValidation.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchInput = document.getElementById('search_input');
    const value = searchInput.value.trim().toLowerCase();

    if(value.length > 2) {
        searchFilter(value);
    }
    else {
        alert("veuillez saisir au moins 3 lettres");
        recipesSection.innerHTML = '';
        recipesCreation(recipeList);
        nbRecipes.innerText = recipeList.length;
        noRecipe.style.display = "none";
    }
});

async function generateFilters() {
    //Ingredients list generation
    const ingredientFilterArea = document.querySelector(".ingredients_area");
    // const ingredient_list = new Set(recipeList.flatMap(recipe =>
    //     recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()))
    // );
    let arrayIngredient1 = [];
    let ingredient_list = [];
    for(let i = 0; i < recipeList.length; i++) {
        arrayIngredient1.push(recipeList[i].ingredients);
    }

    let arrayIngredient2 = arrayIngredient1.flat();
    for(let i = 0; i < arrayIngredient2.length; i++) {
        if(!ingredient_list.includes(arrayIngredient2[i].ingredient)) {
            ingredient_list.push(arrayIngredient2[i].ingredient.toLowerCase());
        }
    }

    filterCreation(ingredientFilterArea, ingredient_list);


    // Ustensiles list generation
    const ustensilsFilterArea = document.querySelector(".ustensils_area");

    let ustensil_list = [];
    let arrayUstensils = []
    for(let i = 0; i < recipeList.length; i++) {
        arrayUstensils.push(recipeList[i].ustensils);
    }
    ustensil_list = arrayUstensils.flat();
    ustensil_list = myMap(ustensil_list);

    filterCreation(ustensilsFilterArea, ustensil_list);
    
    // Appliance filter
    const applianceFilterArea = document.querySelector(".appliance_area");

    let appliance_list = [];
    let arrayAppliance = []
    for(let i = 0; i < recipeList.length; i++) {
        arrayAppliance.push(recipeList[i].appliance);
    }
    appliance_list = arrayAppliance.flat();
    appliance_list = myMap(appliance_list);

    filterCreation(applianceFilterArea, appliance_list);
}



document.addEventListener("DOMContentLoaded", (event) => {
    generateFilters();
    // Ingredients filters
    const ingredientsArea = document.querySelectorAll(".ingredients");

    for(let i = 0; i < ingredientsArea.length; i++) {
        const searchInput = ingredientsArea[i].querySelector(".ingredients_search");
        const optionsContainer = ingredientsArea[i].querySelector(".ingredients_area");
        const noResultMsg = ingredientsArea[i].querySelector(".no-result");
        const options = ingredientsArea[i].querySelectorAll(".ingredients_option");
        const clearBtn = ingredientsArea[i].querySelector(".clear");
        filtersFilter(searchInput, optionsContainer, noResultMsg, options, clearBtn);
    };

    // Appliance filters
    const applianceArea = document.querySelectorAll(".appareils");

    for(let i = 0; i < applianceArea.length; i++) {
        const searchInput = applianceArea[i].querySelector(".appareils_search");
        const optionsContainer = applianceArea[i].querySelector(".appliance_area");
        const noResultMsg = applianceArea[i].querySelector(".no-result");
        const options = applianceArea[i].querySelectorAll(".appliances_option");
        const clearBtn = applianceArea[i].querySelector(".clear");

        filtersFilter(searchInput, optionsContainer, noResultMsg, options, clearBtn);
    };

    // Ustensil filters
    const ustensilsArea = document.querySelectorAll(".ustensils");

    for(let i = 0; i < ustensilsArea.length; i++) {
        const searchInput = ustensilsArea[i].querySelector(".ustensils_search");
        const optionsContainer = ustensilsArea[i].querySelector(".ustensils_area");
        const noResultMsg = ustensilsArea[i].querySelector(".no-result");
        const options = ustensilsArea[i].querySelectorAll(".ustensils_option");
        const clearBtn = ustensilsArea[i].querySelector(".clear");

        filtersFilter(searchInput, optionsContainer, noResultMsg, options, clearBtn);
    };
});

// Drop down menus
dropDownIcon1.addEventListener("click", function(event) {
    event.preventDefault();
    dropDownFunction(chevron1, chevron2, chevron3, dropDown1, dropDown2, dropDown3)
    if(chevron1.classList.contains("fa-chevron-up")) {
        ingredientsTitle.classList.add("open");
        ustensilesTitle.classList.remove("open");
        appareilsTitle.classList.remove("open");
        document.querySelector('.appareils_search').value = '';
        document.querySelector('.ustensils_search').value = '';
    }
    else {
        ingredientsTitle.classList.remove("open");
        document.querySelector('.ingredients_search').value = '';
    }
});

dropDownIcon2.addEventListener("click", function(event) {
    event.preventDefault();
    dropDownFunction(chevron2, chevron1, chevron3, dropDown2, dropDown1, dropDown3)
    if(chevron2.classList.contains("fa-chevron-up")) {
        appareilsTitle.classList.add("open");
        ustensilesTitle.classList.remove("open");
        ingredientsTitle.classList.remove("open");
        document.querySelector('.ingredients_search').value = '';
        document.querySelector('.ustensils_search').value = '';
    }
    else {
        appareilsTitle.classList.remove("open");
        document.querySelector('.appareils_search').value = '';
    }
});

dropDownIcon3.addEventListener("click", function(event) {
    event.preventDefault();
    dropDownFunction(chevron3, chevron1, chevron2, dropDown3, dropDown1, dropDown2)
    if(chevron3.classList.contains("fa-chevron-up")) {
        ustensilesTitle.classList.add("open");
        appareilsTitle.classList.remove("open");
        ingredientsTitle.classList.remove("open");
        document.querySelector('.appareils_search').value = '';
        document.querySelector('.ingredients_search').value = '';
    }
    else {
        ustensilesTitle.classList.remove("open");
        document.querySelector('.ustensils_search').value = '';
    }
});

// clear inputs
window.onload = function() {
    document.querySelector('.ustensils_search').value = '';
    document.querySelector('.appareils_search').value = '';
    document.querySelector('.ingredients_search').value = '';
    document.getElementById('search_input').value = '';
}
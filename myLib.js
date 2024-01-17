import { recipeList } from "./index.js";
const searchFilters = document.getElementById('search_filters');
let tagArray = [];
export let recipeFiltered = recipeList;
const noRecipeFilter = document.querySelector('.no_recipe_filter');
import { recipesCreation } from "./index.js";
export let nbRecipes = document.getElementById("nb_tot");
export const recipesSection = document.querySelector("#recipes_area");
let searchName = document.querySelector('.search_name');
export const noRecipe = document.querySelector('.no_recipe');

export async function searchFilter(value) {
    let filteredCards = myFilter(recipeList, value);
    recipesSection.innerHTML = '';
    searchName.innerText = value;
    recipesCreation(filteredCards);
    nbRecipes.innerText = filteredCards.length;
    if(!filteredCards.length) {
        noRecipe.style.display = "flex";
    }
    else {
        noRecipe.style.display = "none";
    }
}

function myFilter(myArray, value) {
    let newArray = [];

    for(let i = 0; i < myArray.length; i++) {
        var isInIngredients = myArray[i].ingredients.some(function(ingredient) {
            return ingredient.ingredient.toLowerCase().includes(value);
        });
        if(myArray[i].name.toLowerCase().includes(value)
        || myArray[i].description.toLowerCase().includes(value) || isInIngredients) {
            newArray.push(myArray[i]);
        }
    }
    return newArray
}

// Tag filters
async function updateRecipes() {
    recipeFiltered = recipeList;
    tagArray.forEach(value => {
        const filteredCards = recipeFiltered.filter(recipe => {
            var isInIngredients = recipe.ingredients.some(ingredient => 
                ingredient.ingredient.toLowerCase().includes(value)
            );
            const results = [...recipe.ustensils];
            const ustensils = results.map(element => {
                return element.toLowerCase();
                });
            return (isInIngredients || recipe.appliance.toLowerCase().includes(value)
                    || ustensils.includes(value));
        });
        recipeFiltered = filteredCards;
    });
    nbRecipes.innerText = recipeFiltered.length;
    recipesSection.innerHTML = '';
    recipesCreation(recipeFiltered);
    if(recipeFiltered.length <= 0) {
        noRecipeFilter.style.display = "flex";
    }

    else {
        noRecipeFilter.style.display = "none";
    }
}

async function addTagToArray(tag) {
    var iMax = tagArray.length;

    for(var i=0; i<=iMax; i++) {
        if(tagArray[i] === tag.toLowerCase()) {
            return 0;
        }
    }
    tagArray[iMax] = tag.toLowerCase();
    updateRecipes();
}

async function removeTagToArray(tag) {
    var iMax = tagArray.length;

    for(var i=0; i<=iMax; i++) {
        if(tagArray[i] === tag.toLowerCase()) {
            tagArray.splice(i, 1);
        }
    }
    updateRecipes();
}

export function filterCreation(area, list) {
    list.forEach(function(param) {
        const newTag = document.createElement('div');

        if(area.classList.contains('ingredients_area')) {
            newTag.classList.add('ingredients_option');
        }
        else if(area.classList.contains('ustensils_area')) {
            newTag.classList.add('ustensils_option');
        }
        else if(area.classList.contains('appliance_area')) {
            newTag.classList.add('appliances_option');
        }

        newTag.innerText = param;
        newTag.setAttribute('data-value', param);
        area.appendChild(newTag);

        newTag.addEventListener("click", function() {
            newTag.classList.toggle("selected");

            const filterName = document.createElement('label');
            filterName.innerText = newTag.getAttribute("data-value");
            filterName.classList.add("filter_tag");

            const crossIcon = document.createElement('i');
            crossIcon.classList.add('fa-solid', 'fa-xmark');

            searchFilters.appendChild(filterName);
            filterName.appendChild(crossIcon);
            addTagToArray(newTag.getAttribute('data-value'));

            if(!newTag.classList.contains("selected")) {
                let filterTags = document.querySelectorAll(".filter_tag");

                removeTagToArray(newTag.getAttribute('data-value'));

                filterTags.forEach(function(tag) {
                    if(tag.textContent == newTag.getAttribute("data-value")) {
                        tag.remove();
                    }
                })
            }

            crossIcon.addEventListener('click', (event) => {
                event.preventDefault();
                crossIcon.parentElement.remove();
                newTag.classList.remove("selected");
                removeTagToArray(newTag.getAttribute('data-value'));
            });

        });
    });
}

export function filtersFilter(searchInput, optionsContainer, noResultMsg, options, clearBtn) {
    clearBtn.addEventListener("click", function() {
        searchInput.value = "";
        options.forEach(function(option) {
            option.style.display = "block";
        });
        noResultMsg.style.display = "none";
        clearBtn.classList.add("hidden");
    });

    searchInput.addEventListener("input", function() {
        clearBtn.classList.remove("hidden");
        const searchTerm = searchInput.value.toLowerCase();
        if(!searchInput.value){
            clearBtn.classList.add("hidden");
        }
        
        options.forEach(function(option) {
            const optionText = option.textContent.trim().toLocaleLowerCase();
            const shouldShow = optionText.includes(searchTerm);
            option.style.display = shouldShow ? "block" : "none";
        });
        const anyOptionMatch = Array.from(options).some(option => option.style.display
                                === "block");
        noResultMsg.style.display = anyOptionMatch ? "none" : "block";

        if(searchTerm) {
            optionsContainer.classList.add("option_active");
        }
        else {
            optionsContainer.classList.remove("option_active");
        }
    });
}

export function dropDownFunction(chevronClicked, chevronUp1, chevronUp2, menuSelected, menuUp1, menuUp2) {
    if(chevronClicked.classList.contains("fa-chevron-down")) {
        menuSelected.style.display = "block";
        chevronClicked.classList.replace("fa-chevron-down", "fa-chevron-up");
        menuUp1.style.display = "none";
        chevronUp1.classList.replace("fa-chevron-up", "fa-chevron-down");
        menuUp2.style.display = "none";
        chevronUp2.classList.replace("fa-chevron-up", "fa-chevron-down");
    }
    else {
        menuSelected.style.display = "none";
        chevronClicked.classList.replace("fa-chevron-up", "fa-chevron-down");
    }
}
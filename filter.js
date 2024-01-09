import { recipeList } from "./index.js";
import { recipesCreation } from "./index.js";

const inputValidation = document.getElementById('search_area');
const recipesSection = document.querySelector("#recipes_area");
const searchFilters = document.getElementById('search_filters');
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
let tagArray = [];
let recipeFiltered = recipeList;
let nbRecipes = document.getElementById("nb_tot");
nbRecipes.innerText = recipeFiltered.length;

// Top search filter
async function searchFilter(value) {
    const filteredCards = recipeList.filter(recipe => {
        const temps = String(recipe.time);
        var isInIngredients = recipe.ingredients.some(function(ingredient) {
            return ingredient.ingredient.toLowerCase().includes(value);
        });
        console.log(recipe.name.includes(value));
        const results = [...recipe.ustensils];
        return (isInIngredients || recipe.description.toLowerCase().includes(value) || recipe.appliance.toLowerCase().includes(value)
                || recipe.name.toLowerCase().includes(value) || temps.includes(value) || results.includes(value));
    });
    recipesSection.innerHTML = '';
    recipesCreation(filteredCards);
}

inputValidation.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchInput = document.getElementById('search_input');
    const value = searchInput.value.trim().toLowerCase();
    searchFilter(value);
});

// Tag filters
async function updateRecipes() {
    recipeFiltered = recipeList;
    tagArray.forEach(value => {
        const filteredCards = recipeFiltered.filter(recipe => {
            var isInIngredients = recipe.ingredients.some(ingredient => 
                ingredient.ingredient.toLowerCase().includes(value)
            );
            const results = [...recipe.ustensils];
            return (isInIngredients || recipe.appliance.toLowerCase().includes(value)
                    || results.includes(value));
        });
        recipeFiltered = filteredCards;
    });
    nbRecipes.innerText = recipeFiltered.length;
    recipesSection.innerHTML = '';
    recipesCreation(recipeFiltered);
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
    console.log(tagArray);
}

async function removeTagToArray(tag) {
    var iMax = tagArray.length;

    for(var i=0; i<=iMax; i++) {
        if(tagArray[i] === tag.toLowerCase()) {
            tagArray.splice(i, 1);
        }
    }
    updateRecipes();
    console.log(tagArray);
}

async function generateFilters() {
    //Ingredients list generation
    const ingredientFilterArea = document.querySelector(".ingredients_area");
    const ingredient_list = new Set(recipeList.flatMap(recipe =>
        recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()))
    );

    ingredient_list.forEach(function(ingredient) {
        const ingredientTag = document.createElement('div');
        ingredientTag.classList.add('ingredients_option');
        ingredientTag.innerText = ingredient;
        ingredientTag.setAttribute('data-value', ingredient);
        ingredientFilterArea.appendChild(ingredientTag);
        ingredientTag.addEventListener("click", function() {
            ingredientTag.classList.toggle("selected");

            const filterName = document.createElement('label');
            filterName.innerText = ingredientTag.getAttribute("data-value");
            filterName.classList.add("filter_tag");

            const crossIcon = document.createElement('i');
            crossIcon.classList.add('fa-solid', 'fa-xmark');

            searchFilters.appendChild(filterName);
            filterName.appendChild(crossIcon);
            addTagToArray(ingredientTag.getAttribute('data-value'));

            if(!ingredientTag.classList.contains("selected")) {
                let filterTags = document.querySelectorAll(".filter_tag");

                removeTagToArray(ingredientTag.getAttribute('data-value'));

                filterTags.forEach(function(tag) {
                    if(tag.textContent == ingredientTag.getAttribute("data-value")) {
                        tag.remove();
                    }
                })
            }

            crossIcon.addEventListener('click', (event) => {
                event.preventDefault();
                crossIcon.parentElement.remove();
                ingredientTag.classList.remove("selected");
                removeTagToArray(ingredientTag.getAttribute('data-value'));
            });

        });
    });

    // Ustensiles list generation
    const ustensilsFilterArea = document.querySelector(".ustensils_area");
    const ustensil_list = new Set(recipeList.flatMap(recipe =>
        recipe.ustensils.map(ustensil => ustensil.toLowerCase()))
    );

    ustensil_list.forEach(function(ustensil) {
        const ustensilTag = document.createElement('div');
        ustensilTag.classList.add('ustensils_option');
        ustensilTag.innerText = ustensil;
        ustensilTag.setAttribute('data-value', ustensil);
        ustensilsFilterArea.appendChild(ustensilTag);
        ustensilTag.addEventListener("click", function() {
            ustensilTag.classList.toggle("selected");

            const filterName = document.createElement('label');
                    filterName.innerText = ustensilTag.getAttribute("data-value");
                    filterName.classList.add("filter_tag");

                    const crossIcon = document.createElement('i');
                    crossIcon.classList.add('fa-solid', 'fa-xmark');

                    searchFilters.appendChild(filterName);
                    filterName.appendChild(crossIcon);
                    addTagToArray(ustensilTag.getAttribute('data-value'));

                    if(!ustensilTag.classList.contains("selected")) {
                        let filterTags = document.querySelectorAll(".filter_tag");

                        removeTagToArray(ustensilTag.getAttribute('data-value'));

                        filterTags.forEach(function(tag) {
                            if(tag.textContent == ustensilTag.getAttribute("data-value")) {
                                tag.remove();
                            }
                        })
                    }

                    crossIcon.addEventListener('click', (event) => {
                        event.preventDefault();
                        crossIcon.parentElement.remove();
                        ustensilTag.classList.remove("selected");
                        removeTagToArray(ustensilTag.getAttribute('data-value'));
                    });

        });
    });
}
// Appliance filter
const applianceFilterArea = document.querySelector(".appliance_area");
const appliance_list = new Set(recipeList.flatMap(recipe =>
    recipe.appliance)
);

appliance_list.forEach(function(appliance) {
    const applianceTag = document.createElement('div');
    applianceTag.classList.add('appliances_option');
    applianceTag.innerText = appliance;
    applianceTag.setAttribute('data-value', appliance);
    applianceFilterArea.appendChild(applianceTag);
    applianceTag.addEventListener("click", function() {
        applianceTag.classList.toggle("selected");

        const filterName = document.createElement('label');
                filterName.innerText = applianceTag.getAttribute("data-value");
                filterName.classList.add("filter_tag");

                const crossIcon = document.createElement('i');
                crossIcon.classList.add('fa-solid', 'fa-xmark');

                searchFilters.appendChild(filterName);
                filterName.appendChild(crossIcon);
                addTagToArray(applianceTag.getAttribute('data-value'));

                if(!applianceTag.classList.contains("selected")) {
                    let filterTags = document.querySelectorAll(".filter_tag");

                    removeTagToArray(applianceTag.getAttribute('data-value'));

                    filterTags.forEach(function(tag) {
                        if(tag.textContent == applianceTag.getAttribute("data-value")) {
                            tag.remove();
                        }
                    })
                }

                crossIcon.addEventListener('click', (event) => {
                    event.preventDefault();
                    crossIcon.parentElement.remove();
                    applianceTag.classList.remove("selected");
                    removeTagToArray(applianceTag.getAttribute('data-value'));
                });

    });
});

document.addEventListener("DOMContentLoaded", (event) => {
    generateFilters();
    // Ingredients filters
    const ingredientsArea = document.querySelectorAll(".ingredients");

    ingredientsArea.forEach(function(ingredientsArea) {
        const searchInput = ingredientsArea.querySelector(".ingredients_search");
        const optionsContainer = ingredientsArea.querySelector(".ingredients_area");
        const noResultMsg = ingredientsArea.querySelector(".no-result");
        const options = ingredientsArea.querySelectorAll(".ingredients_option");
        const clearBtn = ingredientsArea.querySelector(".clear");

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
    });

    // Appliance filters
    const applianceArea = document.querySelectorAll(".appareils");

    applianceArea.forEach(function(applianceArea) {
        const searchInput = applianceArea.querySelector(".appareils_search");
        const optionsContainer = applianceArea.querySelector(".appliance_area");
        const noResultMsg = applianceArea.querySelector(".no-result");
        const options = applianceArea.querySelectorAll(".appliances_option");
        const clearBtn = applianceArea.querySelector(".clear");

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
    });

    // Ustensil filters
    const ustensilsArea = document.querySelectorAll(".ustensils");

    ustensilsArea.forEach(function(ustensilsArea) {
        const searchInput = ustensilsArea.querySelector(".ustensils_search");
        const optionsContainer = ustensilsArea.querySelector(".ustensils_area");
        const noResultMsg = ustensilsArea.querySelector(".no-result");
        const options = ustensilsArea.querySelectorAll(".ustensils_option");
        const clearBtn = ustensilsArea.querySelector(".clear");

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

            if(!searchInput.value){
                clearBtn.classList.add("hidden");
            }
            const searchTerm = searchInput.value.toLowerCase();

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
    });
});

// Drop down menus
dropDownIcon1.addEventListener("click", function(event) {
    event.preventDefault();
    if(chevron1.classList.contains("fa-chevron-down")) {
        dropDown1.style.display = "block";
        chevron1.classList.replace("fa-chevron-down", "fa-chevron-up");
        ingredientsTitle.classList.add("open");
        dropDown2.style.display = "none";
        chevron2.classList.replace("fa-chevron-up", "fa-chevron-down");
        appareilsTitle.classList.remove("open");
        dropDown3.style.display = "none";
        chevron3.classList.replace("fa-chevron-up", "fa-chevron-down");
        ustensilesTitle.classList.remove("open");
        document.querySelector('.appareils_search').value = '';
        document.querySelector('.ustensils_search').value = '';
    }
    else {
        dropDown1.style.display = "none";
        chevron1.classList.replace("fa-chevron-up", "fa-chevron-down");
        ingredientsTitle.classList.remove("open");
        document.querySelector('.ingredients_search').value = '';
    }
});

dropDownIcon2.addEventListener("click", function(event) {
    event.preventDefault();
    if(chevron2.classList.contains("fa-chevron-down")) {
        dropDown2.style.display = "block";
        chevron2.classList.replace("fa-chevron-down", "fa-chevron-up");
        appareilsTitle.classList.add("open");
        dropDown1.style.display = "none";
        chevron1.classList.replace("fa-chevron-up", "fa-chevron-down");
        ingredientsTitle.classList.remove("open");
        dropDown3.style.display = "none";
        chevron3.classList.replace("fa-chevron-up", "fa-chevron-down");
        ustensilesTitle.classList.remove("open");
        document.querySelector('.ingredients_search').value = '';
        document.querySelector('.ustensils_search').value = '';
    }
    else {
        dropDown2.style.display = "none";
        chevron2.classList.replace("fa-chevron-up", "fa-chevron-down");
        appareilsTitle.classList.remove("open");
        document.querySelector('.appareils_search').value = '';
    }
});

dropDownIcon3.addEventListener("click", function(event) {
    event.preventDefault();
    if(chevron3.classList.contains("fa-chevron-down")) {
        dropDown3.style.display = "block";
        chevron3.classList.replace("fa-chevron-down", "fa-chevron-up");
        ustensilesTitle.classList.add("open");
        dropDown2.style.display = "none";
        chevron2.classList.replace("fa-chevron-up", "fa-chevron-down");
        appareilsTitle.classList.remove("open");
        dropDown1.style.display = "none";
        chevron1.classList.replace("fa-chevron-up", "fa-chevron-down");
        ingredientsTitle.classList.remove("open");
        document.querySelector('.appareils_search').value = '';
        document.querySelector('.ingredients_search').value = '';
    }
    else {
        dropDown3.style.display = "none";
        chevron3.classList.replace("fa-chevron-up", "fa-chevron-down");
        ustensilesTitle.classList.remove("open");
        document.querySelector('.ustensils_search').value = '';
    }
});

// clear inputs
window.onload = function() {
    document.querySelector('.ustensils_search').value = '';
    document.querySelector('.appareils_search').value = '';
    document.querySelector('.ingredients_search').value = '';
}
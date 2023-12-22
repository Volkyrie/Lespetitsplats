function recipeTemplate(data) {
    const {id, image, name, serving, time, ingredients, description} = data;
    const picture = `Photos P7 JS Les petits plats/${image}`;

    function getRecipeCardDOM() {
        const article = document.createElement('article');
        article.setAttribute("id", id);
        article.setAttribute("name", name);
        article.classList.add('card');

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.classList.add('coverfit');

        const temps = document.createElement('span');
        temps.textContent = `${time} min`;
        temps.classList.add('time');

        const textBlock = document.createElement('div');
        textBlock.classList.add('text_block');

        const recipeName = document.createElement('h3');
        recipeName.textContent = name;
        
        const recipeSection = document.createElement('div');
        recipeSection.classList.add('recipe_section');

        const title1 = document.createElement('h4');
        title1.textContent = "RECETTE";

        const recipeDescription = document.createElement('p');
        recipeDescription.textContent = description;
        recipeDescription.classList.add('text_content', 'recipe_description');

        const ingredientSection = document.createElement('div');
        ingredientSection.classList.add('ingredient_section');

        const title2 = document.createElement('h4');
        title2.textContent = "INGREDIENTS";

        article.appendChild(img);
        article.appendChild(temps);
        article.appendChild(textBlock);
        textBlock.appendChild(recipeName);
        textBlock.appendChild(recipeSection);
        recipeSection.appendChild(title1);
        recipeSection.appendChild(recipeDescription);
        textBlock.appendChild(ingredientSection);
        ingredientSection.appendChild(title2);


        ingredients.forEach(element => {
            let ingredientName = document.createElement('label');
            ingredientName.textContent = element.ingredient;
            ingredientName.classList.add('text_content', 'ingredient');

            let ingredientQuantity = document.createElement('p');
            if(element.quantity && element.unit) {
                ingredientQuantity.textContent = `${element.quantity} ${element.unit}`;
            }
            else if(element.quantity) {
                ingredientQuantity.textContent = `${element.quantity}`;
            }
            ingredientQuantity.classList.add('text_content', 'quantity');

            ingredientSection.appendChild(ingredientName);
            ingredientName.appendChild(ingredientQuantity);
        });


        return (article);
    }
    return {name, picture, getRecipeCardDOM}
}
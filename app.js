

var searchbox = document.querySelector(".searchbox");
var searchbtn = document.querySelector(".searchbtn");
var recipe_container = document.querySelector(".recipe-container");
var recipe_details = document.querySelector(".recipe-details");
const fetchrecipe = (recp) => {
  recipe_container.innerHTML = "Fetching Recipes.....";
  const promise = fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${recp}`
  );
  promise
    .then((responses) => {
      return responses.json();
    })
    .then((responses2) => {
      recipe_container.innerHTML = "";
      responses2.meals.forEach((meal) => {
        const newRecipe = document.createElement("div");
        newRecipe.classList.add("recipe");
        newRecipe.innerHTML = `
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p><b> ${meal.strArea}</b> Dish</p>
                <p>Belongs to <b>${meal.strCategory}</b> category</p>
            `;
        const recipe_btn = document.createElement("button");
        recipe_btn.textContent = "Recipe";
        recipe_btn.classList.add("recipe-btn");
        newRecipe.appendChild(recipe_btn);
        recipe_btn.addEventListener("click", () => {
          popupRecipeTab(meal);
        });
        recipe_container.appendChild(newRecipe);

        // console.log(meal);
      });
    });
};

const getIngredients = (meal) => {
  let a = [];
  console.log(meal);

  for (let i = 0; i < 20; i++) {
    if (meal[`strIngredient${i + 1}`] != "") {
      a[i] = [meal[`strIngredient${i + 1}`] + " " + meal[`strMeasure${i + 1}`]];
    }
  }

  for (let i = 0; i < a.length; i++) {
    const listIngre = document.createElement("li");
    listIngre.innerText = a[i];

    let ingredientList = "";
    for (let i = 0; i < a.length; i++) {
      ingredientList += `<li>${a[i]}</li>`;
    }
    return ingredientList;
  }
};

const popupRecipeTab = (meal) => {
  var content = recipe_details.querySelector(".recipe-details-container");
  content.innerHTML = `
      <h2 class="recipeName">${meal.strMeal}</h2>
      <h3>Ingredients:</h3>
      <ul class="recipeIngredients">${getIngredients(meal)}</ul>
      <div class="recipeInstructions">
        <h3>
          Instructions:
        </h3>
        <p>${meal.strInstructions}</p>
      </div>
    `;
  recipe_details.style.display = "block";
};

var btn = document.querySelector(".close-icon");
btn.addEventListener("click", () => {
  recipe_details.style.display = "none";
});

searchbtn.addEventListener("click", (el) => {
  el.preventDefault();
  console.log("btn clicked");
  const searchquery = searchbox.value.trim();
  fetchrecipe(searchquery);
});



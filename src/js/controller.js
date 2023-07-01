import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable'; //polyfilling everything other than async/await
import 'regenerator-runtime/runtime'; //polyfilling async/await

//parcel feature: hot module reloading
if (!module.hot) {
  module.hot.accept();
}

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//showRecipe = controlRecipes
const controlRecipes = async function () {
  try {
    //LOADING DIFFERENT RECIPES DEPENDING ON HASH CHANGE
    const id = window.location.hash.slice(1);
    // console.log(id);
    // case: when no id is present
    if (!id) return;

    //calling the renderSpinner
    recipeView.renderSpinner();

    //1) LOADING THE RECIPE - its now in model.js file but previously it was here
    await model.loadRecipe(id); //async function(showRecipe) is calling another async function(loadRecipe)
    // const { recipe } = model.state;
    // console.log(model.state);

    //2) RENDERING THE RECIPE - now in recipeView.js file
    //LEARNING: This render method here is a common method that is included and work similar in REACT library
    recipeView.render(model.state.recipe);
    // const recipeView = new recipeView(model.state.recipe)
  } catch (err) {
    // alert(err);
    // recipeView.renderError(`${err} 🔥🔥🔥🔥🔥`);
    recipeView.renderError();
  }
};

// showRecipe();

//controlSearchResults(): calls loadSearchResults() to load the recipe based on user input
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);

    //1) Getting Search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load Search results
    await model.loadSearchResults(query);

    //3) Render results
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //4) Render initial Pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {}
};

// controlSearchResults();

const controlPagination = function (goToPage) {
  //1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2) Render NEW Pagination buttons
  paginationView.render(model.state.search);
};

//init(): calls addHandlerRender with agr as controlRecipes
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();

import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

//model: contains applications data
export const state = {
  recipe: {},
  //search: may need it in future to run analytics to find how many searches are being made
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
};

//loadRecipe: responsible for fetching the data from API
export const loadRecipe = async function (id) {
  try {
    //FETCHING THE RECIPE
    const data = await getJSON(`${API_URL}${id}`);

    //LEARNING: What happens in real world is that we create a same object that we're receiving from an API and basically we simplify the data. for example we have source_url, image_url variables in the recipe object.
    // let recipe = data.data.recipe;
    const { recipe } = data.data; //storing the recipe data in recipy object. Destructuring used here
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    //------tempporary error handling-------
    // alert(error);
    console.error(`${err} 🔥🔥🔥🔥🔥`);

    // Actual Error  Handling
    throw err;
  }
};

//LOADING SEARCH RESULTS
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        publisher: rec.publisher,
        title: rec.title,
        sourceUrl: rec.source_url,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.error(`${err} 🔥🔥🔥🔥🔥`);
    throw err;
  }
};

// loadSearchResults('pizza');
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //0
  const end = page * state.search.resultsPerPage; //9
  return state.search.results.slice(start, end);
};

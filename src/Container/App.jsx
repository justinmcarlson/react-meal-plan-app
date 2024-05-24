import { useRef, useState } from 'react';
import NewRecipe from '../Presentational/NewRecipe';
import EditRecipe from '../Presentational/EditRecipe';
import RecipeList from '../Presentational/RecipeList';
import IngredientsList from '../Presentational/IngredientsList';
import '../App.css';

import jsonRecipes from '../assets/data.json';

export default function App() {
  const sortRecipesByName = (recipes) => {
    return recipes.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  };

  const handleSortByName = () => {
    // console.log(sortRecipesByName(allRecipes));
    const nextRecipes = [...allRecipes];
    const sortedNextRecipes = sortRecipesByName(nextRecipes);
    setAllRecipes(sortedNextRecipes);
  };

  const sortedJsonRecipes = sortRecipesByName(jsonRecipes);

  // const recipes = jsonRecipes;
  const [allRecipes, setAllRecipes] = useState(sortedJsonRecipes);

  const [newRecipe, setNewRecipe] = useState({
    name: '',
    tags: [],
    rating: '',
    ingredients: [],
    checked: false,
    imageURL: '',
  });
  const handleNewRecipeChange = ({ target }) => {
    const { name, value } = target;
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      id: Date.now(),
      [name]: value,
    }));
    // console.log(newRecipe);
  };

  const handleNewRecipeSubmit = (event) => {
    event.preventDefault(); // Validate required fields (optional, but recommended)
    newRecipe.ingredients = newRecipe.ingredients.split(/\r?\n/);
    newRecipe.tags = newRecipe.tags.split(',');
    const requiredFields = ['name', 'ingredients'];
    const isEmpty = requiredFields.some((field) => !newRecipe[field]);
    if (isEmpty) {
      alert('Please fill in all required fields (Name and Ingredients).');
      return;
    } // Add the new recipe to the allRecipes state
    setAllRecipes((prevRecipes) => [newRecipe, ...prevRecipes]);
    setNewRecipe({});
    closeModal("newRecipeDialog");
  };

  function closeModal(modalId) {
    // console.log('closing modal');
    const dialog = document.getElementById(modalId);
    if(dialog) {
      dialog.close();
    }
  };
  function openModal(modalId) {
    const dialog = document.getElementById(modalId);
    if (dialog) {
      dialog.showModal();
    }
  };

  const handleCheckedChange = (recipeId, isChecked) => {
    setAllRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, checked: isChecked } : recipe
      )
    );
  };

  const [editRecipe, setEditRecipe] = useState({});
  const ingredientsRef = useRef([]);

  const handleEditRecipeChange = ({ target }) => {
    const { name, value } = target;

    setEditRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleEditRecipe = ({ id, name, rating, tags, ingredients, checked, imageURL }) => {
    console.log(id, name, rating, tags, ingredients, checked, imageURL);
    const lineBreakIngredients = ingredients.join('\n');
    // const joinedIngredients = tags.join(',');
    setEditRecipe((prevRecipe) => ({
      ...prevRecipe,
      id,
      name,
      rating,
      tags,
      ingredients: lineBreakIngredients,
      checked,
      imageURL,
    }));
    openModal("editRecipeDialog");
  };

  const handleEditRecipeSubmit = (event) => {
    event.preventDefault();
    console.log(editRecipe);
    const ingredientsArray = editRecipe.ingredients.split(/\r?\n/);
    const tagsArray = editRecipe.tags.split(',');
    console.log(ingredientsArray);
    // Find the recipe to update in allRecipes
    const updatedRecipes = allRecipes.map((recipe) => {
      if (recipe.id === editRecipe.id) {
        editRecipe.ingredients = ingredientsArray;
        editRecipe.tags = tagsArray;
        return editRecipe;
      } else {
        return recipe;
      }
    });

    // Update the allRecipes state with the edited recipes
    setAllRecipes(updatedRecipes);
    // handleSortByName();

    setEditRecipe({}); // Clear the editRecipe state
    closeModal("editRecipeDialog");
  };

  const handleDelete = (recipeIdToRemove) => {
    setAllRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== recipeIdToRemove)
    );
  };

  return (
    <main>
      <NewRecipe
        handleNewRecipeSubmit={handleNewRecipeSubmit}
        handleNewRecipeChange={handleNewRecipeChange}
        newRecipe={newRecipe}
        openModal={openModal}
        closeModal={closeModal}
      />

      <RecipeList
        allRecipes={allRecipes}
        handleSortByName={handleSortByName}
        handleEditRecipe={handleEditRecipe}
        handleDelete={handleDelete}
        handleCheckedChange={handleCheckedChange}
      />

      <EditRecipe
        handleEditRecipeChange={handleEditRecipeChange}
        handleEditRecipeSubmit={handleEditRecipeSubmit}
        editRecipe={editRecipe}
        closeModal={closeModal}
      />

      <IngredientsList
        allRecipes={allRecipes}
        openModal={openModal}
        closeModal={closeModal}
      />
    </main>
  );
}

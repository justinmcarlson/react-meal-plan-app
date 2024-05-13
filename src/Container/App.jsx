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
    ingredients: [],
    checked: false,
    imageURL: '',
  });
  const handleNewRecipeChange = ({ target }) => {
    const { name, value } = target;
    const handledValue = name === 'ingredients' ? value.split(/\r?\n/) : value; // Split on any combination of \r (carriage return) and \n (newline)
    console.log(handledValue);
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      id: Date.now(),
      [name]: handledValue,
    }));
    // console.log(newRecipe);
  };

  const handleNewRecipeSubmit = (event) => {
    event.preventDefault(); // Validate required fields (optional, but recommended)

    const requiredFields = ['name', 'ingredients'];
    const isEmpty = requiredFields.some((field) => !newRecipe[field]);
    if (isEmpty) {
      alert('Please fill in all required fields (Name and Ingredients).');
      return;
    } // Add the new recipe to the allRecipes state
    setAllRecipes((prevRecipes) => [newRecipe, ...prevRecipes]);
    setNewRecipe({});
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

  const handleEditRecipe = ({ id, name, ingredients, checked, imageURL }) => {
    console.log(id, name, ingredients, checked, imageURL);
    const lineBreakIngredients = ingredients.join('\n');
    setEditRecipe((prevRecipe) => ({
      ...prevRecipe,
      id,
      name,
      ingredients: lineBreakIngredients,
      checked,
      imageURL,
    }));
  };

  const handleEditRecipeSubmit = (event) => {
    event.preventDefault();
    console.log(editRecipe);
    const ingredientsArray = editRecipe.ingredients.split(/\r?\n/);
    console.log(ingredientsArray);
    // Find the recipe to update in allRecipes
    const updatedRecipes = allRecipes.map((recipe) => {
      if (recipe.id === editRecipe.id) {
        editRecipe.ingredients = ingredientsArray;
        return editRecipe;
      } else {
        return recipe;
      }
    });

    // Update the allRecipes state with the edited recipes
    setAllRecipes(updatedRecipes);
    // handleSortByName();

    setEditRecipe({}); // Clear the editRecipe state
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
      />

      <IngredientsList allRecipes={allRecipes} />
    </main>
  );
}

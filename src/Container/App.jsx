import { useRef, useState } from 'react';
import NewRecipe from '../Presentational/NewRecipe';
import EditRecipe from '../Presentational/EditRecipe';
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
      <form onSubmit={handleNewRecipeSubmit}>
        <h2>Add New Recipe</h2>
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          placeholder="New Recipe"
          value={newRecipe.name || ''}
          onChange={handleNewRecipeChange}
          required
        />
        <br />
        <label htmlFor="ingredients">Ingredients (separate by commas):</label>
        <br />
        <textarea
          name="ingredients"
          placeholder="Ingredients..."
          value={newRecipe.ingredients || ''}
          onChange={handleNewRecipeChange}
          required
        />
        <br />
        <button type="submit">Add Recipe</button>
      </form>

      <h2>Recipes</h2>
      <button onClick={handleSortByName}>Sort Recipes</button>
      <ul className="recipe-list">
        {allRecipes.map((recipe) => (
          <li key={recipe.id}>
            <input
              type="checkbox"
              checked={recipe.checked}
              onChange={(e) => handleCheckedChange(recipe.id, e.target.checked)} // Pass recipeId
            />
            {recipe.name}
            <button onClick={() => handleEditRecipe(recipe)}>Edit</button>
            <button onClick={() => handleDelete(recipe.id)}>X</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleEditRecipeSubmit}>
        <h2>Edit Recipe</h2>
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          placeholder="Edit Recipe"
          value={editRecipe.name || ''}
          onChange={handleEditRecipeChange}
          required
        />
        <br />
        <label htmlFor="ingredients">Ingredients (separate by commas):</label>
        <br />
        <textarea
          name="ingredients"
          placeholder="Ingredients..."
          value={editRecipe.ingredients || ''}
          onChange={handleEditRecipeChange}
          required
        />
        <br />
        <button type="submit">Save Recipe</button>
      </form>

      {/* <EditRecipe />
      <NewRecipe /> */}

      <IngredientsList allRecipes={allRecipes} />
    </main>
  );
}

import React from 'react';

export default function RecipeList({
  allRecipes,
  handleSortByName,
  handleEditRecipe,
  handleDelete,
  handleCheckedChange
}) {
  return (
    <>
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
    </>
  );
}

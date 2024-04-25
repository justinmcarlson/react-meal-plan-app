import React from 'react';

export default function IngredientsList({ allRecipes }) {
  const checkedRecipes = allRecipes.filter((recipe) => recipe.checked);
  return (
    <>
      <h2>Ingredients List</h2>
      <ul>
        {checkedRecipes.map((recipe) => (
          <>
            {recipe.ingredients.map((ingredient) => (
              <li>{ingredient}</li>
            ))}
          </>
        ))}
      </ul>
    </>
  );
}

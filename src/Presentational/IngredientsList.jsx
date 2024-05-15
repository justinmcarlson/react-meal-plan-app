import React from 'react';

export default function IngredientsList({ allRecipes, openModal, closeModal }) {
  const checkedRecipes = allRecipes.filter((recipe) => recipe.checked);
  const ingredientsList = checkedRecipes.map((recipe) => recipe.ingredients.join('\n'));
  return (
    <>
      <dialog id="ingredientsListDialog">
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
      <button onClick={() => navigator.clipboard.writeText(ingredientsList) }>Copy to Clipboard</button>
      <button onClick={() => closeModal('ingredientsListDialog')}>Close</button>
      </dialog>
      <button onClick={() => openModal('ingredientsListDialog')}>Show Ingredient List</button>
    </>
  );
}

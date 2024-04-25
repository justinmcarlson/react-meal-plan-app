import React from 'react';

export default function NewRecipe({
  handleNewRecipeSubmit,
  handleNewRecipeChange,
  newRecipe,
}) {
  return (
    <>
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
    </>
  );
}

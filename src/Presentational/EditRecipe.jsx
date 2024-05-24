import React from 'react';

export default function EditRecipe({
  handleEditRecipeChange,
  handleEditRecipeSubmit,
  editRecipe,
  closeModal
}) {
  return (
    <>
      <dialog id="editRecipeDialog"> 
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
        <label htmlFor="rating">Rating:</label>
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          value={editRecipe.rating || ''}
          onChange={handleEditRecipeChange}
          />
          <br />
          <label htmlFor="tags">Tags:</label>
          <input
            name="tags"
            value={editRecipe.tags || ""}
            onChange={handleEditRecipeChange}
          />
        <br />
        <label htmlFor="ingredients">Ingredients (one per line):</label>
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
      <button id="closeEditRecipeDialog" onClick={() => closeModal("editRecipeDialog")} autoFocus>Close</button>
      </dialog>
    </>
  );
}

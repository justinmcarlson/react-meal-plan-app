import React, { useEffect } from "react";

export default function NewRecipe({
  handleNewRecipeSubmit,
  handleNewRecipeChange,
  newRecipe,
  openModal,
  closeModal
}) {
  return (
    <>
      <dialog id="newRecipeDialog">
        <form onSubmit={handleNewRecipeSubmit}>
          <h2>Add New Recipe</h2>
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            placeholder="New Recipe"
            value={newRecipe.name || ""}
            onChange={handleNewRecipeChange}
            required
          />
          <br />
          <label htmlFor="rating">Rating:</label>
          <input
            name="rating"
            type="number"
            min="1"
            max="5"
            value={newRecipe.rating || ""}
            onChange={handleNewRecipeChange}
          />
          <br />
          <label htmlFor="ingredients">Ingredients (separate by commas):</label>
          <br />
          <textarea
            name="ingredients"
            placeholder="Ingredients..."
            value={newRecipe.ingredients || ""}
            onChange={handleNewRecipeChange}
            required
          />
          <br />
          <button type="submit">Add Recipe</button>
        </form>
        <button id="closeNewRecipeDialog" onClick={() => closeModal("newRecipeDialog")} autoFocus>Close</button>
      </dialog>
      <button id="OpenNewRecipeDialog" onClick={() => openModal("newRecipeDialog")}>Add Recipe</button>
    </>
  );
}

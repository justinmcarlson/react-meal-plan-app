import React, { useEffect } from "react";

export default function NewRecipe({
  handleNewRecipeSubmit,
  handleNewRecipeChange,
  newRecipe,
}) {
  function closeModal() {
    const dialog = document.getElementById("newRecipeDialog");
    dialog.close();
  }
  function openModal() {
    const dialog = document.getElementById("newRecipeDialog");
    dialog.showModal();
  }
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
          <button type="submit" >Add Recipe</button>
          <button id="closeNewRecipeDialog" onClick={closeModal} autofocus>Close</button>
        </form>
      </dialog>
      <button id="OpenNewRecipeDialog" onClick={openModal}>Add Recipe</button>
    </>
  );
}

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
      <dialog className="bg-white rounded-3xl p-8 shadow-lg w-4/5 max-w-3xl relative" id="newRecipeDialog">
      <button className="bg-gray-100 hover:bg-gray-300 py-2 px-4 rounded-full absolute top-7 right-7" id="closeNewRecipeDialog" onClick={() => closeModal("newRecipeDialog")} autoFocus>Close</button>

        <form onSubmit={handleNewRecipeSubmit} className="flex flex-col space-y-1">
          <h2 className="text-2xl font-bold">Add New Recipe</h2>
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <input
            name="name"
            placeholder="New Recipe"
            value={newRecipe.name || ""}
            onChange={handleNewRecipeChange}
            required
            className="border border-gray-500 p-2 w-full"
          />
          <br />
          <label htmlFor="rating" className="block mb-2">
            Rating:
          </label>
          <input
            name="rating"
            type="number"
            min="1"
            max="5"
            value={newRecipe.rating || ""}
            onChange={handleNewRecipeChange}
            className="border border-gray-500 p-2 w-full"
          />
          <br />
          <label htmlFor="tags" className="block mb-2">
            Tags:
          </label>
          <input
            name="tags"
            value={newRecipe.tags || ""}
            onChange={handleNewRecipeChange}
            className="border border-gray-500 p-2 w-full"
          />
          <br />
          <label htmlFor="ingredients" className="block mb-2">
            Ingredients (separate by returns):
          </label>
          <br />
          <textarea
            name="ingredients"
            placeholder="Ingredients..."
            value={newRecipe.ingredients || ""}
            onChange={handleNewRecipeChange}
            required
            className="border border-gray-500 p-2 w-full"
          />
          <br />
          <button type="submit" className="bg-lime-600 hover:bg-lime-700 text-white py-2 px-4 rounded-full">Add Recipe</button>
        </form>
      </dialog>
      <button className="bg-lime-600 hover:bg-lime-700 text-white py-2 px-4 rounded-full" id="OpenNewRecipeDialog" onClick={() => openModal("newRecipeDialog")}>Add Recipe</button>
    </>
  );
}

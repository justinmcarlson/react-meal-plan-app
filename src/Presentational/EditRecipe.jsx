import React from 'react';

export default function EditRecipe({
  handleEditRecipeChange,
  handleEditRecipeSubmit,
  editRecipe,
  closeModal
}) {
  return (
    <>
      <dialog id="editRecipeDialog" className='bg-white rounded-3xl p-8 shadow-lg w-4/5 max-w-3xl relative'>
      <button id="closeEditRecipeDialog" className='bg-gray-100 hover:bg-gray-300 py-2 px-4 rounded-full absolute top-7 right-7' onClick={() => closeModal("editRecipeDialog")} autoFocus>Close</button>

      <form onSubmit={handleEditRecipeSubmit} className='flex flex-col space-y-1'>
        <h2 className='text-2xl font-bold'>Edit Recipe</h2>
        <label htmlFor="name" className='block mb-2'>
          Name:
        </label>
        <input
          name="name"
          placeholder="Edit Recipe"
          value={editRecipe.name || ''}
          onChange={handleEditRecipeChange}
          required
          className='border border-gray-500 p-2 w-full'
          />
        <br />
        <label htmlFor="rating" className='block mb-2'>
          Rating:
        </label>
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          value={editRecipe.rating || ''}
          onChange={handleEditRecipeChange}
          className='border border-gray-500 p-2 w-full'
          />
          <br />
          <label htmlFor="tags" className='block mb-2'>
            Tags:
          </label>
          <input
            name="tags"
            value={editRecipe.tags || ""}
            onChange={handleEditRecipeChange}
            className='border border-gray-500 p-2 w-full'
          />
        <br />
        <label htmlFor="ingredients" className='block mb-2'>
          Ingredients (one per line):
        </label>
        <br />
        <textarea
          name="ingredients"
          placeholder="Ingredients..."
          value={editRecipe.ingredients || ''}
          onChange={handleEditRecipeChange}
          required
          className='border border-gray-500 p-2 w-full'
          />
        <br />
        <button type="submit" className='px-4 py-2 rounded-full bg-lime-600 hover:bg-lime-700 active:bg-lime-800 focus:ring focus:ring-lime-300 text-white'>Save Recipe</button>
      </form>
      </dialog>
    </>
  );
}

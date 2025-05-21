import React, { useState } from 'react';

export default function IngredientsList({ allRecipes, openModal, closeModal }) {
  const [copied, setCopied] = useState(false);
  const checkedRecipes = allRecipes.filter((recipe) => recipe.checked);
  const ingredientsList = checkedRecipes.map((recipe) => recipe.ingredients.join('\n'));
  return (
    <>
      <dialog id="ingredientsListDialog" className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="font-bold text-2xl">Ingredients List</h2>
      <ul className="list-disc ml-6">
        {checkedRecipes.map((recipe) => (
          <>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={`${recipe.id}-${index}`} className="text-lg">{ingredient}</li>
            ))}
          </>
        ))}
      </ul>
      <div className="flex justify-end">
        <button 
          className="bg-lime-600 hover:bg-lime-700 text-white py-2 px-4 rounded-full" 
          onClick={() => {
            navigator.clipboard.writeText(ingredientsList);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
          }}
        >
          Copy to Clipboard {copied && '👍'}
        </button>
        <button className="bg-gray-100 hover:bg-gray-300 py-2 px-4 rounded-full" onClick={() => closeModal('ingredientsListDialog')}>Close</button>
      </div>
      </dialog>
      <button className="bg-lime-600 hover:bg-lime-700 text-white py-2 px-4 rounded-full" onClick={() => openModal('ingredientsListDialog')}>Show Ingredient List</button>
    </>
  );
}



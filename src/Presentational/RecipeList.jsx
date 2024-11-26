import React from "react";

export default function RecipeList({
  allRecipes,
  handleSortByName,
  handleEditRecipe,
  handleDelete,
  handleCheckedChange,
}) {
  return (
    <>
      <div className="flex justify-between">

      <h2 className="text-2xl font-bold">Recipes</h2>
      <button className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-full" onClick={handleSortByName}>Sort Recipes</button>
      </div>
      <ul className="list-disc ml-6">
        {allRecipes.map((recipe) => (
          <li key={recipe.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={recipe.checked}
              onChange={(e) => handleCheckedChange(recipe.id, e.target.checked)}
              className="mr-2 w-5 h-5"
            />
            <span className="text-lg flex-grow">{recipe.name}</span>
            <span className="ml-2">
              {recipe.rating &&
              <span className="bg-lime-600 text-white px-2 py-1 rounded mr-1">{recipe.rating}⭐</span>
              }
              {recipe.tags.map((tag, index) => (
                <span key={`${index}-${tag}`} className="bg-red-400 px-2 py-1 rounded mr-1">{tag} </span>
              ))}
              <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded mr-1" onClick={() => handleEditRecipe(recipe)}>Edit</button>
              <button className="bg-gray-100 hover:bg-gray-300 px-4 py-2 rounded" onClick={() => handleDelete(recipe.id)}>X</button>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}



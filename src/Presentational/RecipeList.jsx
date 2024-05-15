import React from "react";
import styles from "./RecipeList.module.css";

export default function RecipeList({
  allRecipes,
  handleSortByName,
  handleEditRecipe,
  handleDelete,
  handleCheckedChange,
}) {
  return (
    <>
      <h2>Recipes</h2>
      <button onClick={handleSortByName}>Sort Recipes</button>
      <ul className={styles.recipeList}>
        {allRecipes.map((recipe) => (
          <li key={recipe.id}>
            <input
              type="checkbox"
              checked={recipe.checked}
              onChange={(e) => handleCheckedChange(recipe.id, e.target.checked)} // Pass recipeId
            />
            <span className={styles.recipeName}>{recipe.name}</span>
            <span className={styles.recipeActions}>
              <span className={styles.recipeRating}>{recipe.rating}⭐</span>
              <button onClick={() => handleEditRecipe(recipe)}>Edit</button>
              <button onClick={() => handleDelete(recipe.id)}>X</button>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

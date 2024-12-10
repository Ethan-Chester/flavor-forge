'use client';
import Link from "next/link";
import { useState } from "react";
import { useRecipes } from "../Hooks/recipesHook";

export default function RecipesList() {
  const recipes = useRecipes();

  const handleLike = async (id: number) => {
    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to like the recipe");
      }
      const updatedRecipe = await response.json();
      recipes.forEach((recipe) => {
        if (recipe.id === id) {
          recipe.likes = updatedRecipe.likes; 
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Link className="back-link" href={"forge"}>BACK</Link>
      <div className="logo-banner shadow">FLAVOR FORGE</div>
      <div className="recipes-list-container">
        <div className="recipes-list">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-item">
              <Link href={`/recipePage/${recipe.id}`} className="recipe-item">
                <div>
                  <img className="recipe-image" src="./no-image.webp" alt="" />
                  <div className="recipe-name">{recipe.name}</div>
                  <div className="tag">
                    Tags:
                    {recipe.tags.map((tag) => (
                      <div key={tag.id}>{tag.name}</div>
                    ))}
                  </div>
                </div>
              </Link>
              <div className="recipe-likes">
                <button
                  className="like-button"
                  onClick={() => handleLike(recipe.id)}>
                  Like
                </button>
                <span>{recipe.likes} likes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

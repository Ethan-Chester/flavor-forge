"use client";
import { useState, useEffect } from "react";
import { Recipe } from "../types/recipe";

export const useRecipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                console.log("FETCH")
              const response = await fetch('/api/recipes'); 
              if (!response.ok) {
                throw new Error(`Failed to fetch recipes: ${response.status}`);
              }
              const data = await response.json();
              setRecipes(data)
            } catch (error) {
              console.error(error);
            }
          };
          
        fetchRecipes();
        
    }, []);

    return recipes;
};
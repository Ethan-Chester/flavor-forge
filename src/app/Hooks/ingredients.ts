"use client";
import { useState, useEffect } from "react";

export const useIngredients = <T>() => {
  const [ingredients, setIngredients] = useState<T | null>(null); 

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        console.log("FETCH");
        const response = await fetch('/api/ingredients'); 
        if (!response.ok) {
          throw new Error(`Failed to fetch ingredients: ${response.status}`);
        }
        const data: T = await response.json(); 
        setIngredients(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIngredients();
  }, []);

  return ingredients;
};

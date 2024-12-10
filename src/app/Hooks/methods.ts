"use client";
import { useState, useEffect } from "react";

export const useMethods = <T>() => {
  const [methods, setMethods] = useState<T | null>(null); 

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        console.log("FETCH");
        const response = await fetch('/api/methods'); 
        if (!response.ok) {
          throw new Error(`Failed to fetch methods: ${response.status}`);
        }
        const data: T = await response.json(); 
        setMethods(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMethods();
  }, []);

  return methods;
};

"use client";
import { useState, useEffect } from "react";

export const useTags = () => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                console.log("FETCH")
              const response = await fetch('/api/tags'); 
              if (!response.ok) {
                throw new Error(`Failed to fetch tags: ${response.status}`);
              }
              const data = await response.json();
              setTags(data)
            } catch (error) {
              console.error(error);
            }
          };

        fetchTags();

    }, []);

    return tags;
};
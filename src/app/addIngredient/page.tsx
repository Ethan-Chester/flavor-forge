'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useTags } from '../Hooks/tagsHook';
import { Tag } from '../types/tag';

export default function AddIngredient() {
  const tags: Tag[] = useTags();

  const [checkedOptions, setCheckedOptions] = useState<Record<string, boolean>>({});
  const [ingredientName, setIngredientName] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const checkedCount = Object.values(checkedOptions).filter(Boolean).length;

  const handleCheckboxChange = (option: string) => {
    const isChecked = !!checkedOptions[option];
    if (isChecked) {
      setCheckedOptions((prevState) => ({
        ...prevState,
        [option]: false,
      }));
    } else if (checkedCount < 3) {
      setCheckedOptions((prevState) => ({
        ...prevState,
        [option]: true,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ingredientName.trim()) {
      setStatusMessage('Ingredient name is required.');
      return;
    }

    const selectedTags = Object.keys(checkedOptions).filter((tag) => checkedOptions[tag]);

    if (selectedTags.length === 0) {
      setStatusMessage('At least one tag must be selected.');
      return;
    }

    try {
      const response = await fetch('/api/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: ingredientName, tags: selectedTags }),
      });

      if (response.ok) {
        setStatusMessage('Ingredient created successfully!');
        setIngredientName('');
        setCheckedOptions({});
      } else {
        const errorData = await response.json();
        setStatusMessage(errorData.error || 'Failed to create ingredient.');
      }
    } catch (error) {
      console.error(error);
      setStatusMessage('An unexpected error occurred.');
    }
  };

  if (!tags) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link className="back-link" href={"forge"}>BACK</Link>
      <div className="logo-banner shadow">FLAVOR FORGE</div>
      <form className="add-ingredient-form" onSubmit={handleSubmit}>
        <button type="submit" className="button-2">Add Ingredient</button>
        <h1 className="add-ingredient-text-1">Enter Ingredient Name:</h1>
        <input
          type="text"
          id="ingredient-name"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
        />
        <hr />
        <h1 className="add-ingredient-text-2">
          <span>{checkedCount}/3</span> - Select Up To 3 Tags:
        </h1>
        <div className="tag-selection-container">
          {tags.map((tag, index) => (
            <label
              key={index}
              className={`checkbox-box ${checkedOptions[tag.name] ? 'checked' : ''}`}
            >
              <input
                type="checkbox"
                name="options"
                value={tag.name}
                checked={!!checkedOptions[tag.name]}
                onChange={() => handleCheckboxChange(tag.name)}
              />
              <span className="box-label">{tag.name}</span>
            </label>
          ))}
        </div>
        {statusMessage && <p className="status-message">{statusMessage}</p>}
      </form>
    </div>
  );
}

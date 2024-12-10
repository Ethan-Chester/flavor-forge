'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useTags } from '../Hooks/tagsHook';
import { Tag } from '../types/tag';

export default function GenerateRecipe() {
  const tags: Tag[] = useTags();

  const [checkedOptions, setCheckedOptions] = useState<Record<string, boolean>>({});
  const [recipeName, setRecipeName] = useState<string>('');
  const [numSteps, setNumSteps] = useState<number>(1); // Default to 1
  const [generatedSteps, setGeneratedSteps] = useState<string[] | null>(null);
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
  
    if (!recipeName.trim()) {
      setStatusMessage('Recipe name is required.');
      return;
    }
  
    if (numSteps <= 0) {
      setStatusMessage('Please specify a valid number of steps.');
      return;
    }
  
    const selectedTags = Object.keys(checkedOptions).filter((tag) => checkedOptions[tag]);
  
    if (selectedTags.length === 0) {
      setStatusMessage('At least one tag must be selected.');
      return;
    }
  
    try {
      const response = await fetch('/api/generateRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: recipeName,
          tags: selectedTags,
          numSteps,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setGeneratedSteps(data.steps);
        setStatusMessage(`Recipe "${data.name}" saved successfully!`);
      } else {
        const errorData = await response.json();
        setStatusMessage(errorData.error || 'Failed to generate and save recipe.');
      }
    } catch (error) {
      console.error(error);
      setStatusMessage('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <Link className="back-link" href={"forge"}>BACK</Link>
      <div className="logo-banner shadow">FLAVOR FORGE</div>
      <form className="generate-recipe-form" onSubmit={handleSubmit}>
        <button type="submit" className="button-2">Generate</button>
        <h1 className="generate-recipe-text-1">Enter Recipe Name:</h1>
        <input
          type="text"
          id="recipe-name"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
        <h1 className="generate-recipe-text-2">Number of Steps:</h1>
        <select
          id="num-steps"
          className="steps-input"
          value={numSteps}
          onChange={(e) => setNumSteps(parseInt(e.target.value))}
        >
          {Array.from({ length: 15 }, (_, index) => index + 1).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <h1 className="generate-recipe-text-3">
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
        {generatedSteps && (
          <div>
            <h2>Generated Steps:</h2>
            <ol>
              {generatedSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </form>
    </div>
  );
}

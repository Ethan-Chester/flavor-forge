'use client';
import Link from "next/link";
import { useState } from "react";

export default function AddMethod() {
  const [methodTemplate, setMethodTemplate] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!methodTemplate.trim() || !methodTemplate.includes('[ingredient]')) {
      setStatusMessage('Template must include at least one "[ingredient]".');
      return;
    }

    try {
      const response = await fetch('/api/methods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ template: methodTemplate }),
      });

      if (response.ok) {
        setStatusMessage('Cooking method added successfully!');
        setMethodTemplate('');
      } else {
        const errorData = await response.json();
        setStatusMessage(errorData.error || 'Failed to add cooking method.');
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
      <form className="add-method-form" onSubmit={handleSubmit}>
        <button type="submit" className="button-2">Add Cooking Method</button>
        <h1 className="add-method-text-1">Enter Cooking Method:</h1>
        <input
          type="text"
          id="method-name"
          value={methodTemplate}
          onChange={(e) => setMethodTemplate(e.target.value)}
        />
        <h1 className="add-method-text-2">
          NOTE: must contain at least 1 [ingredient] <br />
          <br /> Examples: <br />
          <br /> " Whisk [ingredient] until smooth. " <br />
          <br /> " Mix [ingredient] thoroughly in a bowl " <br />
          <br /> " Add [ingredient] to [ingredient] and stir well. "
        </h1>
        {statusMessage && <p className="status-message">{statusMessage}</p>}
      </form>
    </div>
  );
}

import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const prisma = new PrismaClient();

async function fetchRecipe(id: string) {
  const recipe = await prisma.savedRecipes.findUnique({
    where: { id: parseInt(id) },
    include: {
      tags: true,
      ingredients: true,
      steps: true,
    },
  });
  return recipe;
}

export default async function RecipePage({ params }: { params: { id: string } }) {
  const recipe = await fetchRecipe(params.id);

  if (!recipe) {
    notFound();
  }

  return (
    <div className='recipe-page'>
      <h1>{recipe.name}</h1>
      <img
        src={recipe.image_path || './no-image.webp'}
        alt={recipe.name}
        className="recipe-image"
      />
      <h2>Tags:</h2>
      <ul>
        {recipe.tags.map((tag) => (
          <div key={tag.id}>{tag.name}</div>
        ))}
      </ul>
      <h2>Ingredients:</h2>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <div key={ingredient.id}>{ingredient.name}</div>
        ))}
      </ul>
      <h2>Steps:</h2>
      <ol>
        {recipe.steps.map((step) => (
          <div key={step.id}>{step.content}</div>
        ))}
      </ol>
      <Link href="/recipesList">Back to Recipes</Link>
    </div>
  );
}

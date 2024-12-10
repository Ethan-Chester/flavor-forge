import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, tags, numSteps } = await request.json();

    if (!name || !tags || !Array.isArray(tags) || !numSteps) {
      return NextResponse.json(
        { error: 'Name, tags, and number of steps are required.' },
        { status: 400 }
      );
    }

    // Fetch ingredients matching the selected tags
    const ingredients = await prisma.ingredients.findMany({
      where: {
        tags: {
          some: {
            name: { in: tags },
          },
        },
      },
    });

    if (ingredients.length === 0) {
      return NextResponse.json(
        { error: 'No ingredients found for the selected tags.' },
        { status: 400 }
      );
    }

    // Fetch tags to ensure they exist
    const existingTags = await prisma.tags.findMany({
      where: {
        name: { in: tags },
      },
      select: { id: true },
    });

    if (existingTags.length === 0) {
      return NextResponse.json(
        { error: 'No matching tags found in the database.' },
        { status: 400 }
      );
    }

    // Fetch random cooking methods
    const methods = await prisma.cookingMethods.findMany();

    if (methods.length === 0) {
      return NextResponse.json(
        { error: 'No cooking methods available.' },
        { status: 400 }
      );
    }

    // Generate random steps
    const steps = Array.from({ length: numSteps }).map(() => {
      const method = methods[Math.floor(Math.random() * methods.length)];
      const ingredient = ingredients[Math.floor(Math.random() * ingredients.length)];
      return method.template.replace(/\[ingredient\]/g, ingredient.name);
    });

    console.log({
      name,
      tags: existingTags,
      ingredients: ingredients.map((ingredient) => ({ id: ingredient.id })),
      steps: steps.map((step, index) => ({
        step_num: index + 1,
        content: step,
      })),
    });

    // Save the generated recipe in the database
    const savedRecipe = await prisma.savedRecipes.create({
      data: {
        name,
        image_path: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
        tags: {
          connect: existingTags.map((tag) => ({ id: tag.id })),
        },
        ingredients: {
          connect: ingredients.map((ingredient) => ({ id: ingredient.id })),
        },
        steps: {
          create: steps.map((step, index) => ({
            step_num: index + 1,
            content: step,
          })),
        },
      },
    });

    return NextResponse.json(savedRecipe, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate and save recipe.' }, { status: 500 });
  }
}

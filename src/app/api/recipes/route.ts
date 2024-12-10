import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET requests
export async function GET() {
  try {
    const recipes = await prisma.savedRecipes.findMany({
      include: {
        ingredients: true,
        tags: true,
        steps: true,
      },
    });
    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}

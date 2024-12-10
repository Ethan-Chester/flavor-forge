import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET requests
export async function GET() {
  try {
    const ingredients = await prisma.ingredients.findMany({
      select: {
        name: true,
        tags: true
      },
    });
    return NextResponse.json(ingredients, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
      const { name, tags } = await request.json(); 
  
      if (!name || !Array.isArray(tags)) {
        return NextResponse.json(
          { error: 'Invalid input. Name and tags are required.' },
          { status: 400 }
        );
      }
  
      const tagConnections = await prisma.tags.findMany({
        where: {
          name: { in: tags },
        },
        select: { id: true },
      });
      
      const ingredient = await prisma.ingredients.create({
        data: {
          name,
          image_path: "",
          tags: {
            connect: tagConnections,
          },
        },
      });
  
      return NextResponse.json(ingredient, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to create ingredient' }, { status: 500 });
    }
  }
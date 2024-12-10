import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const recipes = await prisma.tags.findMany({
        select: {
          name: true
        },
      });
    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}

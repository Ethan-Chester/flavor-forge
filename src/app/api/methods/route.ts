import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET requests
export async function GET() {
  try {
    const methods = await prisma.cookingMethods.findMany({
      select: {
        id: true,
        template: true,
      },
    });
    return NextResponse.json(methods, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch cooking methods' }, { status: 500 });
  }
}

// Handle POST requests
export async function POST(request: Request) {
  try {
    const { template } = await request.json();

    if (!template || !template.includes('[ingredient]')) {
      return NextResponse.json(
        { error: 'Template must include at least one "[ingredient]".' },
        { status: 400 }
      );
    }

    const method = await prisma.cookingMethods.create({
      data: {
        template,
      },
    });

    return NextResponse.json(method, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create cooking method' }, { status: 500 });
  }
}

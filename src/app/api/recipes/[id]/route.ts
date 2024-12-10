import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const recipeId = parseInt(params.id);

    const updatedRecipe = await prisma.savedRecipes.update({
      where: { id: recipeId },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(updatedRecipe, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update likes" }, { status: 500 });
  }
}

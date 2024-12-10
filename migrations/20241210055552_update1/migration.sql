-- CreateTable
CREATE TABLE "Ingredients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CookingMethods" (
    "id" SERIAL NOT NULL,
    "template" TEXT NOT NULL,

    CONSTRAINT "CookingMethods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CookingSteps" (
    "id" SERIAL NOT NULL,
    "step_num" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "recipe_id" INTEGER NOT NULL,

    CONSTRAINT "CookingSteps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedRecipes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SavedRecipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IngredientTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_IngredientTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_RecipeIngredients" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_RecipeIngredients_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_RecipeTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_RecipeTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE INDEX "_IngredientTags_B_index" ON "_IngredientTags"("B");

-- CreateIndex
CREATE INDEX "_RecipeIngredients_B_index" ON "_RecipeIngredients"("B");

-- CreateIndex
CREATE INDEX "_RecipeTags_B_index" ON "_RecipeTags"("B");

-- AddForeignKey
ALTER TABLE "CookingSteps" ADD CONSTRAINT "CookingSteps_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "SavedRecipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientTags" ADD CONSTRAINT "_IngredientTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientTags" ADD CONSTRAINT "_IngredientTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeIngredients" ADD CONSTRAINT "_RecipeIngredients_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeIngredients" ADD CONSTRAINT "_RecipeIngredients_B_fkey" FOREIGN KEY ("B") REFERENCES "SavedRecipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeTags" ADD CONSTRAINT "_RecipeTags_A_fkey" FOREIGN KEY ("A") REFERENCES "SavedRecipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeTags" ADD CONSTRAINT "_RecipeTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

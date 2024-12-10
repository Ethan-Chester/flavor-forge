const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Clearing existing data...');
    await prisma.cookingSteps.deleteMany();
    await prisma.savedRecipes.deleteMany();
    await prisma.ingredients.deleteMany();
    await prisma.tags.deleteMany();
    await prisma.cookingMethods.deleteMany();
    await prisma.$executeRaw`ALTER SEQUENCE "Ingredients_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "CookingMethods_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "Tags_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "CookingSteps_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "SavedRecipes_id_seq" RESTART WITH 1`;

    console.log('Seeding database...');

    // Tags
    await prisma.tags.createMany({
        data: [
            { name: 'Vegan' },
            { name: 'Gluten-Free' },
            { name: 'Quick' },
            { name: 'Dessert' },
            { name: 'Spicy' },
        ],
    });

    // Ingredients
    const ingredientsData = [
        {
            name: 'Tomato',
            image_path: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
            tags: [1, 2],
        },
        {
            name: 'Garlic',
            image_path: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
            tags: [1, 3],
        },
        {
            name: 'Onion',
            image_path: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
            tags: [2, 3],
        },
        {
            name: 'Olive Oil',
            image_path: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
            tags: [1, 4],
        },
        {
            name: 'Flour',
            image_path: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
            tags: [3, 4],
        },
        {
            name: 'Sugar',
            image_path: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
            tags: [4, 5],
        },
        {
            name: 'Cocoa Powder',
            image_path: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
            tags: [4],
        },
        {
            name: 'Butter',
            image_path: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
            tags: [2, 5],
        },
        {
            name: 'Milk',
            image_path: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
            tags: [1, 5],
        },
    ];

    for (const ingredient of ingredientsData) {
        await prisma.ingredients.create({
            data: {
                name: ingredient.name,
                image_path: ingredient.image_path,
                tags: {
                    connect: ingredient.tags.map((tagId) => ({ id: tagId })),
                },
            },
        });
    }

    // Cooking Methods
    await prisma.cookingMethods.createMany({
        data: [
            { template: 'Chop and sauté in [ingredient]' },
            { template: 'Boil in salted [ingredient] for 10 minutes' },
            { template: 'Bake [ingredient] at 350°F for 20 minutes' },
        ],
    });

    // Recipes
    await prisma.savedRecipes.create({
        data: {
            name: 'Tomato Pasta',
            image_path: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
            likes: 10,
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
            },
            tags: {
                connect: [{ id: 3 }],
            },
            steps: {
                create: [
                    { step_num: 1, content: 'Chop tomatoes, garlic, and onion.' },
                    { step_num: 2, content: 'Sauté chopped ingredients in olive oil until golden.' },
                    { step_num: 3, content: 'Mix with cooked pasta and serve.' },
                ],
            },
        },
    });

    await prisma.savedRecipes.create({
        data: {
            name: 'Garlic Bread',
            image_path: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
            likes: 5,
            ingredients: {
                connect: [{ id: 2 }, { id: 4 }, { id: 5 }],
            },
            tags: {
                connect: [{ id: 4 }],
            },
            steps: {
                create: [
                    { step_num: 1, content: 'Mix flour and olive oil to form dough.' },
                    { step_num: 2, content: 'Chop garlic and mix with butter or oil.' },
                    { step_num: 3, content: 'Bake dough with garlic mix at 350°F.' },
                ],
            },
        },
    });

    await prisma.savedRecipes.create({
        data: {
            name: 'Chocolate Cake',
            image_path: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
            likes: 15,
            ingredients: {
                connect: [{ id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }],
            },
            tags: {
                connect: [{ id: 4 }],
            },
            steps: {
                create: [
                    { step_num: 1, content: 'Mix flour, sugar, and cocoa powder in a bowl.' },
                    { step_num: 2, content: 'Add butter and milk to the mixture and stir until smooth.' },
                    { step_num: 3, content: 'Pour the batter into a greased baking dish.' },
                    { step_num: 4, content: 'Bake at 350°F for 30 minutes or until a toothpick comes out clean.' },
                ],
            },
        },
    });

    console.log('Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

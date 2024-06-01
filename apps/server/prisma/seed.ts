import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getRandomValueInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

async function main() {
  const dishNames = [
    "borscht",
    "shchi",
    "goulash soup",
    "pumpkin puree soup",
    "tom yum",
    "zucchini puree soup",
    "chicken soup with cheese",
    "mushroom puree soup",
  ];

  for (let i = 0; i < dishNames.length; i++) {
    const dish = await prisma.dish.upsert({
      where: { id: i, title: dishNames[i] },
      update: {},
      create: {
        id: i,
        title: dishNames[i],
        description: "Description for " + dishNames[i],
        mealTypes: ["LUNCH", "DINNER"],
      },
    });

    await prisma.recipe.create({
      data: {
        description: "Description for " + dishNames[i],
        dishId: dish.id,
        duration: 900,
        complexity: getRandomValueInRange(1, 5),
        calories: getRandomValueInRange(500, 1500),
        portions: getRandomValueInRange(2, 6),
        weight: getRandomValueInRange(1000, 2000),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

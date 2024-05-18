import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    await prisma.dish.upsert({
      where: { id: i, title: dishNames[i] },
      update: {},
      create: {
        id: i,
        title: dishNames[i],
        description: "Description for " + dishNames[i],
        mealTypes: ["LUNCH", "DINNER"],
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

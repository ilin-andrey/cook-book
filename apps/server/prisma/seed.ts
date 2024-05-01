import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dishNames = [
    "Spaghetti Bolognese",
    "Chicken Parmesan",
    "Caesar Salad",
    "Margherita Pizza",
    "Mushroom Risotto",
    "Lobster Bisque",
    "Grilled Cheese Sandwich",
    "Chicken Alfredo",
    "Beef Tacos",
    "Shrimp Scampi",
    "Clam Chowder",
    "Chicken Marsala",
    "Beef Stroganoff",
    "Fish and Chips",
    "Chicken Piccata",
    "Pulled Pork Sandwich",
    "Chicken Enchiladas",
    "Beef Burritos",
    "Chicken and Waffles",
    "Lamb Gyros",
  ];

  for (let i = 0; i < dishNames.length; i++) {
    await prisma.dish.upsert({
      where: { id: i, title: dishNames[i] },
      update: {},
      create: {
        id: i,
        title: dishNames[i],
        description: "Description for " + dishNames[i],
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

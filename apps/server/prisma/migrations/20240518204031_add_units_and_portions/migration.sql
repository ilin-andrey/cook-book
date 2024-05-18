/*
  Warnings:

  - Changed the type of `units` on the `m2m_ingredients_on_recipes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Units" AS ENUM ('GRAMM', 'KILOGRAMM', 'MILLILITER', 'LITER', 'PIECE', 'TEASPOON', 'TABLESPOON');

-- AlterTable
ALTER TABLE "m2m_ingredients_on_recipes" ALTER COLUMN "size" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "units",
ADD COLUMN     "units" "Units" NOT NULL;

-- AlterTable
ALTER TABLE "recipe" ADD COLUMN     "portions" INTEGER NOT NULL DEFAULT 1;

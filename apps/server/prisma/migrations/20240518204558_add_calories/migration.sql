/*
  Warnings:

  - Added the required column `calories` to the `recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recipe" ADD COLUMN     "calories" INTEGER NOT NULL;

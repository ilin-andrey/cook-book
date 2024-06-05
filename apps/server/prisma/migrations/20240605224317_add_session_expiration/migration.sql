/*
  Warnings:

  - Added the required column `expired_at` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "session" ADD COLUMN     "expired_at" TIMESTAMPTZ(6) NOT NULL;

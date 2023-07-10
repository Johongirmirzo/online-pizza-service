/*
  Warnings:

  - You are about to alter the column `stars` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "stars" SET DATA TYPE INTEGER;

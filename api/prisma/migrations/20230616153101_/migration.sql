/*
  Warnings:

  - You are about to drop the column `calorie` on the `MenuItem` table. All the data in the column will be lost.
  - Added the required column `calories` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "calorie",
ADD COLUMN     "calories" TEXT NOT NULL;

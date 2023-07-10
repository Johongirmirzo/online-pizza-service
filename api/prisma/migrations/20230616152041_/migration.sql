/*
  Warnings:

  - Added the required column `calorie` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carbohydrates` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fats` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proteins` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "calorie" TEXT NOT NULL,
ADD COLUMN     "carbohydrates" TEXT NOT NULL,
ADD COLUMN     "fats" TEXT NOT NULL,
ADD COLUMN     "proteins" TEXT NOT NULL;

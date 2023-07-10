/*
  Warnings:

  - Added the required column `weight` to the `Dip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dip" ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "PizzaSize" ALTER COLUMN "weight" SET DATA TYPE DOUBLE PRECISION;

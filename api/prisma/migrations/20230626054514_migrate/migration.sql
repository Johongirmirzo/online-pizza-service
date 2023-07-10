/*
  Warnings:

  - Added the required column `type` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MenuItemType" AS ENUM ('DRINKS', 'SNACKS');

-- AlterTable
ALTER TABLE "Dip" ADD COLUMN     "dataType" TEXT NOT NULL DEFAULT 'DIP';

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "type" "MenuItemType" NOT NULL;

-- AlterTable
ALTER TABLE "PizzaSize" ALTER COLUMN "price" SET DATA TYPE TEXT,
ALTER COLUMN "weight" SET DATA TYPE TEXT;

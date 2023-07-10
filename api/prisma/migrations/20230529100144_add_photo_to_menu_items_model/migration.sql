/*
  Warnings:

  - Added the required column `photo` to the `Dip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo_id` to the `Dip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo_id` to the `PizzaSize` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dip" ADD COLUMN     "photo" TEXT NOT NULL,
ADD COLUMN     "photo_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PizzaSize" ADD COLUMN     "photo_id" TEXT NOT NULL;

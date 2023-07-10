/*
  Warnings:

  - Added the required column `toppingCategoryId` to the `Topping` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Topping" ADD COLUMN     "toppingCategoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Topping" ADD CONSTRAINT "Topping_toppingCategoryId_fkey" FOREIGN KEY ("toppingCategoryId") REFERENCES "ToppingCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `toppingCategoryId` on the `Topping` table. All the data in the column will be lost.
  - You are about to drop the `ToppingCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `forPizzaSize` to the `Topping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Topping` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Topping" DROP CONSTRAINT "Topping_toppingCategoryId_fkey";

-- AlterTable
ALTER TABLE "Topping" DROP COLUMN "toppingCategoryId",
ADD COLUMN     "forPizzaSize" "ToppingForPizzaSize" NOT NULL,
ADD COLUMN     "type" "ToppingCategoryType" NOT NULL;

-- DropTable
DROP TABLE "ToppingCategory";

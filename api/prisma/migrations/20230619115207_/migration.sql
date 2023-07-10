/*
  Warnings:

  - You are about to drop the column `photoUrl` on the `PizzaSize` table. All the data in the column will be lost.
  - Added the required column `spiceLevel` to the `Pizza` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `PizzaSize` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SpiceLevel" AS ENUM ('NOT_SPICY', 'MILD', 'HOT');

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "spiceLevel" "SpiceLevel" NOT NULL DEFAULT 'NOT_SPICY';

-- AlterTable
ALTER TABLE "Pizza" ADD COLUMN     "spiceLevel" "SpiceLevel" NOT NULL;

-- AlterTable
ALTER TABLE "PizzaSize" DROP COLUMN "photoUrl",
ADD COLUMN     "photo" TEXT NOT NULL,
ALTER COLUMN "price" DROP DEFAULT;

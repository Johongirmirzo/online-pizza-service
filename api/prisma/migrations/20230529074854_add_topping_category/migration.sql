-- CreateEnum
CREATE TYPE "ToppingCategoryType" AS ENUM ('STANDARD', 'EXTRA');

-- CreateEnum
CREATE TYPE "ToppingForPizzaSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateTable
CREATE TABLE "ToppingCategory" (
    "id" SERIAL NOT NULL,
    "type" "ToppingCategoryType" NOT NULL,
    "forPizzaSize" "ToppingForPizzaSize" NOT NULL,

    CONSTRAINT "ToppingCategory_pkey" PRIMARY KEY ("id")
);

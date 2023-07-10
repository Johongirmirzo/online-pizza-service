/*
  Warnings:

  - You are about to alter the column `orderTotal` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "orderTotal" SET DATA TYPE INTEGER;

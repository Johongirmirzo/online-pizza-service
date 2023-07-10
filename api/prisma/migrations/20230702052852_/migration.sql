/*
  Warnings:

  - Added the required column `orderChosenTime` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderChosenTime" TIMESTAMP(3) NOT NULL;

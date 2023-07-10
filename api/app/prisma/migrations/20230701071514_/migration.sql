/*
  Warnings:

  - Added the required column `password` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

/*
  Warnings:

  - You are about to alter the column `phoneNumber` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(13)`.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "phoneNumber" SET DATA TYPE VARCHAR(13);

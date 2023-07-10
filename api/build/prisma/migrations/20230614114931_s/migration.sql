/*
  Warnings:

  - You are about to alter the column `phoneNumber` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `VarChar(13)` to `VarChar(12)`.

*/
-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "phoneNumber" SET DATA TYPE VARCHAR(12);

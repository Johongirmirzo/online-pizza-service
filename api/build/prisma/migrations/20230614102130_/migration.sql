/*
  Warnings:

  - You are about to drop the column `annualLeave` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `remainingLeave` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "annualLeave",
DROP COLUMN "remainingLeave";

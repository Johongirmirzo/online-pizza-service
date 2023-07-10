/*
  Warnings:

  - You are about to drop the `FeedbackPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FeedbackPhoto" DROP CONSTRAINT "FeedbackPhoto_feedbackId_fkey";

-- DropTable
DROP TABLE "FeedbackPhoto";

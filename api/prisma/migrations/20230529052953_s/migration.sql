/*
  Warnings:

  - You are about to drop the column `feedbackTypes` on the `DeliveryFeedback` table. All the data in the column will be lost.
  - You are about to drop the column `questionnaire` on the `DineInFeedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DeliveryFeedback" DROP COLUMN "feedbackTypes";

-- AlterTable
ALTER TABLE "DineInFeedback" DROP COLUMN "questionnaire";

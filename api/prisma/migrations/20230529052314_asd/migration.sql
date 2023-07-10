/*
  Warnings:

  - You are about to drop the column `photos` on the `Feedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "photos";

-- CreateTable
CREATE TABLE "FeedbackPhoto" (
    "id" SERIAL NOT NULL,
    "photos" JSONB[],
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "feedbackId" INTEGER NOT NULL,

    CONSTRAINT "FeedbackPhoto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FeedbackPhoto" ADD CONSTRAINT "FeedbackPhoto_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

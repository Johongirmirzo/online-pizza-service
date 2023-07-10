-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('NOT_EXAMINED', 'EXAMINED');

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "status" "FeedbackStatus" NOT NULL DEFAULT 'NOT_EXAMINED';

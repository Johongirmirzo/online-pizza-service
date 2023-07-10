-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('DELIVERY', 'DINE_IN');

-- CreateEnum
CREATE TYPE "FeedbackOn" AS ENUM ('HYGIENE', 'HOSPITALITY', 'ACCURACY', 'SPEED', 'CALL_CENTRE', 'PRODUCT_QUALITY', 'ONLINE_ORDER');

-- CreateEnum
CREATE TYPE "VisitAmount" AS ENUM ('WEEKLY', 'MONTHLY', 'OCCASIONALY', 'FIRST_TIME');

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "type" "FeedbackType" NOT NULL,
    "fullName" VARCHAR(50) NOT NULL,
    "gender" "Gender" NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "experience" TEXT NOT NULL,
    "photos" JSONB[],
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryFeedback" (
    "id" SERIAL NOT NULL,
    "dateOfOrder" TIMESTAMP(3) NOT NULL,
    "timeOfOrder" TEXT NOT NULL,
    "feedbackOn" "FeedbackOn" NOT NULL,
    "feedbackOnChoice" TEXT NOT NULL,
    "feedbackTypes" JSONB[],
    "feedbackId" INTEGER NOT NULL,

    CONSTRAINT "DeliveryFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DineInFeedback" (
    "id" SERIAL NOT NULL,
    "dateOfVisit" TIMESTAMP(3) NOT NULL,
    "timeOfVisit" TEXT NOT NULL,
    "visitAmount" "VisitAmount" NOT NULL,
    "questionnaire" JSONB[],
    "feedbackId" INTEGER NOT NULL,

    CONSTRAINT "DineInFeedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeliveryFeedback" ADD CONSTRAINT "DeliveryFeedback_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DineInFeedback" ADD CONSTRAINT "DineInFeedback_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

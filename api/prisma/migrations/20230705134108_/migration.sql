-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "orderReceivingTime" SET DATA TYPE TEXT,
ALTER COLUMN "orderCompletionTime" DROP NOT NULL,
ALTER COLUMN "orderCompletionTime" SET DATA TYPE TEXT,
ALTER COLUMN "orderChosenTime" SET DATA TYPE TEXT;

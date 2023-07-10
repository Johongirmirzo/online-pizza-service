-- CreateEnum
CREATE TYPE "ReviewSubject" AS ENUM ('DRIVER', 'STUFF', 'MANAGER', 'RESTAURANT', 'FOOD', 'OTHER');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "reviewSubject" "ReviewSubject" NOT NULL,
    "message" TEXT NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PRIVATE',
    "stars" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to alter the column `salary` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `passportPhotoId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo_id` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `panPhotoId` to the `Manager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "passportPhotoId" TEXT NOT NULL,
ADD COLUMN     "photoId" TEXT NOT NULL,
ADD COLUMN     "resumeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "photo_id" TEXT NOT NULL,
ALTER COLUMN "salary" SET DATA TYPE INTEGER,
ALTER COLUMN "leaveAmount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Manager" ADD COLUMN     "panPhotoId" TEXT NOT NULL;

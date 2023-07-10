/*
  Warnings:

  - You are about to drop the `EmergencyContact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmployeeNote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LeaveDay` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmergencyContact" DROP CONSTRAINT "EmergencyContact_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeNote" DROP CONSTRAINT "EmployeeNote_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "LeaveDay" DROP CONSTRAINT "LeaveDay_employeeId_fkey";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "emergencyContacts" JSONB[],
ADD COLUMN     "employeeNotes" JSONB[],
ADD COLUMN     "leaveDays" JSONB[];

-- DropTable
DROP TABLE "EmergencyContact";

-- DropTable
DROP TABLE "EmployeeNote";

-- DropTable
DROP TABLE "LeaveDay";

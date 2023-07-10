-- CreateEnum
CREATE TYPE "ApplicantRole" AS ENUM ('TEAM_MEMBER', 'DRIVER', 'MANAGER', 'AREA_COACH');

-- CreateEnum
CREATE TYPE "ApplicantStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Education" AS ENUM ('NO_EDUCATION', 'HIGH_SCHOOL', 'GRADUATE', 'POST_GRADUATE');

-- CreateEnum
CREATE TYPE "MarriageStatus" AS ENUM ('MARRIED', 'SINGLE');

-- CreateEnum
CREATE TYPE "DrivingLicense" AS ENUM ('A1', 'A', 'B', 'C');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('PART_TIME', 'FULL_TIME');

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "firstname" VARCHAR(25) NOT NULL,
    "lastname" VARCHAR(25) NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" VARCHAR(13) NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "passportPhotoUrl" TEXT NOT NULL,
    "noticePeriod" TEXT NOT NULL,
    "dateOfJoining" TIMESTAMP(3) NOT NULL,
    "applicationStatus" "ApplicantStatus" NOT NULL,
    "education" "Education" NOT NULL,
    "martialStatus" "MarriageStatus" NOT NULL,
    "experiences" JSONB[],
    "languages" JSONB[],
    "computerSkills" JSONB[],
    "source" TEXT NOT NULL,
    "hasBankAccount" BOOLEAN NOT NULL DEFAULT false,
    "bankAccountName" TEXT,
    "resumeUrl" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "panNumber" TEXT NOT NULL,
    "panPhoto" TEXT NOT NULL,
    "currentEmployer" TEXT NOT NULL,
    "currentRole" TEXT NOT NULL,
    "currentCTC" TEXT NOT NULL,
    "currentLocation" TEXT NOT NULL,
    "applicantId" INTEGER NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "drivingLicence" "DrivingLicense" NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "employmentType" "EmploymentType" NOT NULL,
    "applicantId" INTEGER NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" SERIAL NOT NULL,
    "employmentType" "EmploymentType" NOT NULL,
    "applicantId" INTEGER NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_email_key" ON "Application"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Application_phoneNumber_key" ON "Application"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

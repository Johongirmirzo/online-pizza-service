-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "role" "ApplicantRole" NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "city" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT NOT NULL,
    "maritalStatus" "MarriageStatus" NOT NULL,
    "employeeNotes" JSONB[],
    "emergancyContacts" JSONB[],
    "leaveDays" JSONB[],
    "leaveAmount" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

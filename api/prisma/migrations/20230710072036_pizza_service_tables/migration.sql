-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUB_ADMIN', 'DRIVER');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'ACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('ACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

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

-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('PRIMARY', 'SECONDARY', 'TERTIARY', 'LEASE_IMPORTANT');

-- CreateEnum
CREATE TYPE "ReviewSubject" AS ENUM ('DRIVER', 'STUFF', 'MANAGER', 'RESTAURANT', 'FOOD', 'OTHER');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('DELIVERY', 'DINE_IN');

-- CreateEnum
CREATE TYPE "FeedbackOn" AS ENUM ('HYGIENE', 'HOSPITALITY', 'ACCURACY', 'SPEED', 'CALL_CENTRE', 'PRODUCT_QUALITY', 'ONLINE_ORDER');

-- CreateEnum
CREATE TYPE "VisitAmount" AS ENUM ('WEEKLY', 'MONTHLY', 'OCCASIONALY', 'FIRST_TIME');

-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('NOT_EXAMINED', 'EXAMINED');

-- CreateEnum
CREATE TYPE "ToppingCategoryType" AS ENUM ('STANDARD', 'EXTRA');

-- CreateEnum
CREATE TYPE "ToppingForPizzaSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "SpiceLevel" AS ENUM ('NOT_SPICY', 'MILD', 'HOT');

-- CreateEnum
CREATE TYPE "MenuItemType" AS ENUM ('DRINKS', 'SNACKS', 'DESSERTS', 'SALADS');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CARD');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'APPROVED', 'DECLINED');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('DELIVERY', 'PICKUP');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('ORDER_NOT_CONFIRMED', 'ORDER_CANCELLED', 'ORDER_CONFIRMED', 'ORDER_BEING_PREPARED', 'ORDER_BOXED', 'ORDER_DELIVERED', 'ORDER_PICKED_UP');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "photo" TEXT,
    "photo_id" TEXT,
    "name" VARCHAR(50) NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
    "role" "Role" NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "CustomerStatus" NOT NULL DEFAULT 'ACTIVE',
    "gender" "Gender",
    "phone" TEXT NOT NULL,
    "birthDate" TEXT,
    "password" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerAdress" (
    "id" SERIAL NOT NULL,
    "streetName" TEXT NOT NULL,
    "approach" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "doorCode" TEXT NOT NULL,
    "apartmentNumber" TEXT NOT NULL,
    "comment" VARCHAR(255) NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "customerId" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerAdress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "change" TEXT,
    "restaurantToClientMessages" TEXT[],
    "orderNote" TEXT,
    "orderItems" JSONB NOT NULL,
    "orderTotal" INTEGER NOT NULL,
    "orderType" "OrderType" NOT NULL,
    "orderStatus" "OrderStatus" NOT NULL DEFAULT 'ORDER_NOT_CONFIRMED',
    "customerId" INTEGER NOT NULL,
    "orderChosenTime" TEXT NOT NULL,
    "orderReceivingTime" TEXT NOT NULL,
    "orderCompletionTime" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "role" "ApplicantRole" NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "photoId" TEXT NOT NULL,
    "firstname" VARCHAR(25) NOT NULL,
    "lastname" VARCHAR(25) NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" VARCHAR(13) NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "passportPhotoUrl" TEXT NOT NULL,
    "passportPhotoId" TEXT NOT NULL,
    "noticePeriod" TEXT NOT NULL,
    "dateOfJoining" TIMESTAMP(3) NOT NULL,
    "applicationStatus" "ApplicantStatus" NOT NULL DEFAULT 'PENDING',
    "education" "Education" NOT NULL,
    "martialStatus" "MarriageStatus" NOT NULL,
    "experiences" JSONB[],
    "languages" JSONB[],
    "computerSkills" TEXT[],
    "source" TEXT NOT NULL,
    "hasBankAccount" BOOLEAN NOT NULL DEFAULT false,
    "bankAccountName" TEXT,
    "resumeUrl" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "panPhoto" TEXT NOT NULL,
    "panPhotoId" TEXT NOT NULL,
    "panNumber" TEXT NOT NULL,
    "currentEmployer" TEXT NOT NULL,
    "currentRole" TEXT NOT NULL,
    "currentLocation" TEXT NOT NULL,
    "currentCTC" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" VARCHAR(13) NOT NULL,
    "photo" TEXT NOT NULL,
    "photo_id" TEXT NOT NULL,
    "role" "ApplicantRole" NOT NULL,
    "salary" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "maritalStatus" "MarriageStatus" NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leaveAmount" INTEGER NOT NULL DEFAULT 0,
    "emergancyContacts" JSONB[],
    "employeeNotes" JSONB[],
    "leaveDays" JSONB[],

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phoneNumber" VARCHAR(12) NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "type" "FeedbackType" NOT NULL,
    "fullName" VARCHAR(50) NOT NULL,
    "gender" "Gender" NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "status" "FeedbackStatus" NOT NULL DEFAULT 'NOT_EXAMINED',
    "feedback" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "experience" TEXT NOT NULL,
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
    "feedbackId" INTEGER NOT NULL,

    CONSTRAINT "DeliveryFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DineInFeedback" (
    "id" SERIAL NOT NULL,
    "dateOfVisit" TIMESTAMP(3) NOT NULL,
    "timeOfVisit" TEXT NOT NULL,
    "visitAmount" "VisitAmount" NOT NULL,
    "feedbackId" INTEGER NOT NULL,

    CONSTRAINT "DineInFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "photo" TEXT NOT NULL,
    "photo_id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topping" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "type" "ToppingCategoryType" NOT NULL,
    "forPizzaSize" "ToppingForPizzaSize" NOT NULL,
    "light" INTEGER NOT NULL DEFAULT 0,
    "standard" INTEGER NOT NULL DEFAULT 0,
    "double" INTEGER NOT NULL DEFAULT 0,
    "extra" INTEGER NOT NULL DEFAULT 0,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Topping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pizza" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "vegan" BOOLEAN NOT NULL DEFAULT false,
    "soldAmount" INTEGER NOT NULL DEFAULT 0,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "spiceLevel" "SpiceLevel" NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Pizza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PizzaSize" (
    "id" SERIAL NOT NULL,
    "size" "Size" NOT NULL,
    "price" TEXT NOT NULL,
    "orderedAmount" INTEGER NOT NULL DEFAULT 0,
    "photo" TEXT NOT NULL,
    "photo_id" TEXT NOT NULL,
    "circumfarance" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "nutritionalValue" JSONB NOT NULL,
    "slices" JSONB[],
    "crusts" JSONB[],
    "edges" JSONB[],
    "standardToppings" JSONB[],
    "extraToppings" JSONB[],
    "pizzaId" INTEGER NOT NULL,

    CONSTRAINT "PizzaSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" SERIAL NOT NULL,
    "type" "MenuItemType" NOT NULL,
    "name" VARCHAR(70) NOT NULL,
    "description" VARCHAR(250) NOT NULL,
    "vegan" BOOLEAN NOT NULL DEFAULT false,
    "soldAmount" INTEGER NOT NULL DEFAULT 0,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "calories" TEXT NOT NULL,
    "fats" TEXT NOT NULL,
    "proteins" TEXT NOT NULL,
    "carbohydrates" TEXT NOT NULL,
    "spiceLevel" "SpiceLevel" NOT NULL DEFAULT 'NOT_SPICY',
    "pieces" JSONB[],
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dip" (
    "id" SERIAL NOT NULL,
    "dataType" TEXT NOT NULL DEFAULT 'DIP',
    "type" VARCHAR(50) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "photo" TEXT NOT NULL,
    "photo_id" TEXT NOT NULL,
    "vegan" BOOLEAN NOT NULL DEFAULT false,
    "soldAmount" INTEGER NOT NULL DEFAULT 0,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "weight" DOUBLE PRECISION NOT NULL,
    "nutritionalValue" JSONB NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Dip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_phoneNumber_key" ON "Employee"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pizza_name_key" ON "Pizza"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_name_key" ON "MenuItem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Dip_type_key" ON "Dip"("type");

-- AddForeignKey
ALTER TABLE "CustomerAdress" ADD CONSTRAINT "CustomerAdress_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryFeedback" ADD CONSTRAINT "DeliveryFeedback_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DineInFeedback" ADD CONSTRAINT "DineInFeedback_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pizza" ADD CONSTRAINT "Pizza_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PizzaSize" ADD CONSTRAINT "PizzaSize_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dip" ADD CONSTRAINT "Dip_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

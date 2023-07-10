-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CARD');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'APPROVED', 'DECLINED');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('DELIVERY', 'PICKUP');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('ORDER_NOT_CONFIRMED', 'ORDER_CANCELLED', 'ORDER_CONFIRMED', 'ORDER_BEING_PREPARED', 'ORDER_BOXED', 'ORDER_DELIVERED', 'ORDER_PICKED_UP');

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
    "paymentStatus" "PaymentStatus" NOT NULL,
    "change" TEXT,
    "restaurantToClientMessages" TEXT[],
    "orderNote" TEXT NOT NULL,
    "orderItems" JSONB[],
    "orderTotal" DOUBLE PRECISION NOT NULL,
    "orderType" "OrderType" NOT NULL,
    "orderStatus" "OrderStatus" NOT NULL DEFAULT 'ORDER_NOT_CONFIRMED',
    "orderReceivingTime" TIMESTAMP(3) NOT NULL,
    "orderCompletionTime" TIMESTAMP(3) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomerAdress" ADD CONSTRAINT "CustomerAdress_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

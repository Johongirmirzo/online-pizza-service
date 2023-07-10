-- AlterTable
ALTER TABLE "Dip" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Topping" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "light" INTEGER NOT NULL DEFAULT 0,
    "standard" INTEGER NOT NULL DEFAULT 0,
    "double" INTEGER NOT NULL DEFAULT 0,
    "extra" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Topping_pkey" PRIMARY KEY ("id")
);

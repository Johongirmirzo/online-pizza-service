-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(150) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `Dip` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dip_type_key" ON "Dip"("type");

/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `ratings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ratings_productId_key" ON "ratings"("productId");

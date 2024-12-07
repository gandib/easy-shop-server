/*
  Warnings:

  - A unique constraint covering the columns `[userId,productId]` on the table `ratings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ratings_productId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ratings_userId_productId_key" ON "ratings"("userId", "productId");

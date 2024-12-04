/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "reviews_userId_key" ON "reviews"("userId");

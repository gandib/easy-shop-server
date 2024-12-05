/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `follows` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "follows_userId_key" ON "follows"("userId");

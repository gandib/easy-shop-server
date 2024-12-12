/*
  Warnings:

  - A unique constraint covering the columns `[reviewId,shopId]` on the table `shop-responses` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "shop-responses_reviewId_key";

-- DropIndex
DROP INDEX "shop-responses_shopId_key";

-- CreateIndex
CREATE UNIQUE INDEX "shop-responses_reviewId_shopId_key" ON "shop-responses"("reviewId", "shopId");

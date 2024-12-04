/*
  Warnings:

  - You are about to drop the column `shopId` on the `flash-sales` table. All the data in the column will be lost.
  - Added the required column `productId` to the `flash-sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "flash-sales" DROP CONSTRAINT "flash-sales_shopId_fkey";

-- AlterTable
ALTER TABLE "flash-sales" DROP COLUMN "shopId",
ADD COLUMN     "productId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "flash-sales" ADD CONSTRAINT "flash-sales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

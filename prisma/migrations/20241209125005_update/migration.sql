/*
  Warnings:

  - Made the column `shopId` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "shopId" SET NOT NULL;

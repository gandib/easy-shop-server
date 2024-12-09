/*
  Warnings:

  - Added the required column `shopId` to the `ratings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ratings" ADD COLUMN     "shopId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "shopId" DROP DEFAULT;

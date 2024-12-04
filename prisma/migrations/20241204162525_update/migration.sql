/*
  Warnings:

  - Added the required column `percentage` to the `flash-sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flash-sales" ADD COLUMN     "percentage" DOUBLE PRECISION NOT NULL;

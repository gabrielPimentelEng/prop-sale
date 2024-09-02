/*
  Warnings:

  - Added the required column `email` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

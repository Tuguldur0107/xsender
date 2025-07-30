/*
  Warnings:

  - Added the required column `etaxUsername` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keyFileBase64` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keyPassword` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "etaxUsername" TEXT NOT NULL,
ADD COLUMN     "keyFileBase64" TEXT NOT NULL,
ADD COLUMN     "keyPassword" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

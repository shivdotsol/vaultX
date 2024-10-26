/*
  Warnings:

  - The `authType` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "authType",
ADD COLUMN     "authType" TEXT NOT NULL DEFAULT 'EMAIL';

-- DropEnum
DROP TYPE "AuthType";

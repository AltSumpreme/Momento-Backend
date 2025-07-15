/*
  Warnings:

  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,eventId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventDateTime` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_authid_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "eventDateTime" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_userId_eventId_key" ON "Booking"("userId", "eventId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_authid_fkey" FOREIGN KEY ("authid") REFERENCES "Auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `classification` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `languageId` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `nativeText` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Word` table. All the data in the column will be lost.
  - Added the required column `category` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language_id` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nativeWord` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `word` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_languageId_fkey";

-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_userId_fkey";

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "classification",
DROP COLUMN "languageId",
DROP COLUMN "nativeText",
DROP COLUMN "text",
DROP COLUMN "userId",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "language_id" INTEGER NOT NULL,
ADD COLUMN     "nativeWord" TEXT NOT NULL,
ADD COLUMN     "pronunciation" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD COLUMN     "word" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

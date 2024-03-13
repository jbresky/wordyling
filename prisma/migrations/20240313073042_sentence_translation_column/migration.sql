/*
  Warnings:

  - Added the required column `translation` to the `Sentence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sentence" ADD COLUMN     "translation" TEXT NOT NULL;

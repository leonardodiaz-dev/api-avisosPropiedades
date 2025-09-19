/*
  Warnings:

  - You are about to drop the column `habitaciones` on the `Propiedad` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Propiedad" RENAME COLUMN "habitaciones" TO "dormitorios";

/*
  Warnings:

  - Added the required column `dni_contacto` to the `Mensaje` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Mensaje" ADD COLUMN     "dni_contacto" TEXT NOT NULL;

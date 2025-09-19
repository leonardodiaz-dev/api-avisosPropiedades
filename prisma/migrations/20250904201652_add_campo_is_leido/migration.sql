/*
  Warnings:

  - The `estado` column on the `Mensaje` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Mensaje" ADD COLUMN     "isLeido" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "estado",
ADD COLUMN     "estado" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "public"."EstadoMensaje";

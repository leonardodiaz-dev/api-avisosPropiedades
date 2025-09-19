/*
  Warnings:

  - The values [NoLeido] on the enum `EstadoMensaje` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `dni_contacto` on the `Mensaje` table. All the data in the column will be lost.
  - You are about to drop the column `email_contacto` on the `Mensaje` table. All the data in the column will be lost.
  - You are about to drop the column `nombre_contacto` on the `Mensaje` table. All the data in the column will be lost.
  - You are about to drop the column `telefono_contacto` on the `Mensaje` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."EstadoMensaje_new" AS ENUM ('PENDIENTE', 'Leido', 'Respondido');
ALTER TABLE "public"."Mensaje" ALTER COLUMN "estado" TYPE "public"."EstadoMensaje_new" USING ("estado"::text::"public"."EstadoMensaje_new");
ALTER TYPE "public"."EstadoMensaje" RENAME TO "EstadoMensaje_old";
ALTER TYPE "public"."EstadoMensaje_new" RENAME TO "EstadoMensaje";
DROP TYPE "public"."EstadoMensaje_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Mensaje" DROP CONSTRAINT "Mensaje_remitenteId_fkey";

-- AlterTable
ALTER TABLE "public"."Mensaje" DROP COLUMN "dni_contacto",
DROP COLUMN "email_contacto",
DROP COLUMN "nombre_contacto",
DROP COLUMN "telefono_contacto",
ADD COLUMN     "contactoId" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "estado" SET DEFAULT 'PENDIENTE',
ALTER COLUMN "remitenteId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."Contacto" (
    "id_contacto" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("id_contacto")
);

-- AddForeignKey
ALTER TABLE "public"."Mensaje" ADD CONSTRAINT "Mensaje_remitenteId_fkey" FOREIGN KEY ("remitenteId") REFERENCES "public"."Usuario"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Mensaje" ADD CONSTRAINT "Mensaje_contactoId_fkey" FOREIGN KEY ("contactoId") REFERENCES "public"."Contacto"("id_contacto") ON DELETE SET NULL ON UPDATE CASCADE;

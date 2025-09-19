/*
  Warnings:

  - The values [No_Leido] on the enum `EstadoMensaje` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `tipo_anuncio` on the `Propiedad` table. All the data in the column will be lost.
  - Added the required column `tipo_moneda` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_operacion` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Propiedad` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."TipoMoneda" AS ENUM ('Soles', 'Dolares');

-- CreateEnum
CREATE TYPE "public"."TipoOperacion" AS ENUM ('Venta', 'Alquiler');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."EstadoMensaje_new" AS ENUM ('NoLeido', 'Leido', 'Respondido');
ALTER TABLE "public"."Mensaje" ALTER COLUMN "estado" TYPE "public"."EstadoMensaje_new" USING ("estado"::text::"public"."EstadoMensaje_new");
ALTER TYPE "public"."EstadoMensaje" RENAME TO "EstadoMensaje_old";
ALTER TYPE "public"."EstadoMensaje_new" RENAME TO "EstadoMensaje";
DROP TYPE "public"."EstadoMensaje_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Propiedad" DROP COLUMN "tipo_anuncio",
ADD COLUMN     "tipo_moneda" "public"."TipoMoneda" NOT NULL,
ADD COLUMN     "tipo_operacion" "public"."TipoOperacion" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Propiedad_usuarioId_idx" ON "public"."Propiedad"("usuarioId");

-- CreateIndex
CREATE INDEX "Propiedad_distritoId_idx" ON "public"."Propiedad"("distritoId");

-- CreateIndex
CREATE INDEX "Propiedad_tipoPropiedadId_idx" ON "public"."Propiedad"("tipoPropiedadId");

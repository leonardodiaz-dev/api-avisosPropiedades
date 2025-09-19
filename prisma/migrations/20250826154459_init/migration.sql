/*
  Warnings:

  - You are about to drop the column `area` on the `Propiedad` table. All the data in the column will be lost.
  - Added the required column `area_total` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_anuncio` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_usuario` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."TipoUsuario" AS ENUM ('PARTICULAR', 'AGENTE');

-- AlterTable
ALTER TABLE "public"."Propiedad" DROP COLUMN "area",
ADD COLUMN     "antiguedad" INTEGER,
ADD COLUMN     "area_construida" DOUBLE PRECISION,
ADD COLUMN     "area_total" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tipo_anuncio" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "tipo_usuario" "public"."TipoUsuario" NOT NULL;

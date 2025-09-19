/*
  Warnings:

  - You are about to drop the `_CaracteristicaToPropiedad` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_CaracteristicaToPropiedad" DROP CONSTRAINT "_CaracteristicaToPropiedad_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_CaracteristicaToPropiedad" DROP CONSTRAINT "_CaracteristicaToPropiedad_B_fkey";

-- DropTable
DROP TABLE "public"."_CaracteristicaToPropiedad";

-- CreateTable
CREATE TABLE "public"."CaracteristicaPropiedad" (
    "id" SERIAL NOT NULL,
    "propiedadId" INTEGER NOT NULL,
    "caracteristicaId" INTEGER NOT NULL,

    CONSTRAINT "CaracteristicaPropiedad_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."CaracteristicaPropiedad" ADD CONSTRAINT "CaracteristicaPropiedad_propiedadId_fkey" FOREIGN KEY ("propiedadId") REFERENCES "public"."Propiedad"("id_propiedad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CaracteristicaPropiedad" ADD CONSTRAINT "CaracteristicaPropiedad_caracteristicaId_fkey" FOREIGN KEY ("caracteristicaId") REFERENCES "public"."Caracteristica"("id_caracteristica") ON DELETE RESTRICT ON UPDATE CASCADE;

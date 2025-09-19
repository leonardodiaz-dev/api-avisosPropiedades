-- AlterTable
ALTER TABLE "public"."Propiedad" ADD COLUMN     "archivado" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "public"."Visualizacion" (
    "id_visualizacion" SERIAL NOT NULL,
    "propiedadId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visualizacion_pkey" PRIMARY KEY ("id_visualizacion")
);

-- AddForeignKey
ALTER TABLE "public"."Visualizacion" ADD CONSTRAINT "Visualizacion_propiedadId_fkey" FOREIGN KEY ("propiedadId") REFERENCES "public"."Propiedad"("id_propiedad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "public"."EstadoMensaje" AS ENUM ('NO_LEIDO', 'LEIDO', 'RESPONDIDO');

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "public"."Mensaje" (
    "id_mensaje" SERIAL NOT NULL,
    "nombre_contacto" TEXT NOT NULL,
    "email_contacto" TEXT NOT NULL,
    "telefono_contacto" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "estado" "public"."EstadoMensaje" NOT NULL,
    "remitenteId" INTEGER NOT NULL,
    "destinatarioId" INTEGER NOT NULL,
    "propiedadId" INTEGER NOT NULL,

    CONSTRAINT "Mensaje_pkey" PRIMARY KEY ("id_mensaje")
);

-- CreateTable
CREATE TABLE "public"."Tipo_Propiedad" (
    "id_tipoPropiedad" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Tipo_Propiedad_pkey" PRIMARY KEY ("id_tipoPropiedad")
);

-- CreateTable
CREATE TABLE "public"."Propiedad" (
    "id_propiedad" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "direccion" TEXT NOT NULL,
    "area" DOUBLE PRECISION,
    "habitaciones" INTEGER,
    "banos" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER NOT NULL,
    "tipoPropiedadId" INTEGER NOT NULL,
    "distritoId" INTEGER NOT NULL,

    CONSTRAINT "Propiedad_pkey" PRIMARY KEY ("id_propiedad")
);

-- CreateTable
CREATE TABLE "public"."Caracteristica" (
    "id_caracteristica" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Caracteristica_pkey" PRIMARY KEY ("id_caracteristica")
);

-- CreateTable
CREATE TABLE "public"."Imagen" (
    "id_imagen" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "propiedadId" INTEGER NOT NULL,

    CONSTRAINT "Imagen_pkey" PRIMARY KEY ("id_imagen")
);

-- CreateTable
CREATE TABLE "public"."Favorito" (
    "id_favorito" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "propiedadId" INTEGER NOT NULL,

    CONSTRAINT "Favorito_pkey" PRIMARY KEY ("id_favorito")
);

-- CreateTable
CREATE TABLE "public"."Departamento" (
    "id_departamento" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("id_departamento")
);

-- CreateTable
CREATE TABLE "public"."Provincia" (
    "id_provincia" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "departamentoId" INTEGER NOT NULL,

    CONSTRAINT "Provincia_pkey" PRIMARY KEY ("id_provincia")
);

-- CreateTable
CREATE TABLE "public"."Distrito" (
    "id_distrito" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "provinciaId" INTEGER NOT NULL,

    CONSTRAINT "Distrito_pkey" PRIMARY KEY ("id_distrito")
);

-- CreateTable
CREATE TABLE "public"."_CaracteristicaToPropiedad" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CaracteristicaToPropiedad_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_dni_key" ON "public"."Usuario"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Favorito_usuarioId_propiedadId_key" ON "public"."Favorito"("usuarioId", "propiedadId");

-- CreateIndex
CREATE INDEX "_CaracteristicaToPropiedad_B_index" ON "public"."_CaracteristicaToPropiedad"("B");

-- AddForeignKey
ALTER TABLE "public"."Mensaje" ADD CONSTRAINT "Mensaje_remitenteId_fkey" FOREIGN KEY ("remitenteId") REFERENCES "public"."Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Mensaje" ADD CONSTRAINT "Mensaje_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "public"."Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Mensaje" ADD CONSTRAINT "Mensaje_propiedadId_fkey" FOREIGN KEY ("propiedadId") REFERENCES "public"."Propiedad"("id_propiedad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Propiedad" ADD CONSTRAINT "Propiedad_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Propiedad" ADD CONSTRAINT "Propiedad_tipoPropiedadId_fkey" FOREIGN KEY ("tipoPropiedadId") REFERENCES "public"."Tipo_Propiedad"("id_tipoPropiedad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Propiedad" ADD CONSTRAINT "Propiedad_distritoId_fkey" FOREIGN KEY ("distritoId") REFERENCES "public"."Distrito"("id_distrito") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Imagen" ADD CONSTRAINT "Imagen_propiedadId_fkey" FOREIGN KEY ("propiedadId") REFERENCES "public"."Propiedad"("id_propiedad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorito" ADD CONSTRAINT "Favorito_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorito" ADD CONSTRAINT "Favorito_propiedadId_fkey" FOREIGN KEY ("propiedadId") REFERENCES "public"."Propiedad"("id_propiedad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Provincia" ADD CONSTRAINT "Provincia_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "public"."Departamento"("id_departamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Distrito" ADD CONSTRAINT "Distrito_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "public"."Provincia"("id_provincia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CaracteristicaToPropiedad" ADD CONSTRAINT "_CaracteristicaToPropiedad_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Caracteristica"("id_caracteristica") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CaracteristicaToPropiedad" ADD CONSTRAINT "_CaracteristicaToPropiedad_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Propiedad"("id_propiedad") ON DELETE CASCADE ON UPDATE CASCADE;

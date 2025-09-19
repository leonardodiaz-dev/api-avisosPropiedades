/*
  Warnings:

  - The values [NO_LEIDO,LEIDO,RESPONDIDO] on the enum `EstadoMensaje` will be removed. If these variants are still used in the database, this will fail.
  - The values [PARTICULAR,AGENTE] on the enum `TipoUsuario` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."EstadoMensaje_new" AS ENUM ('No_Leido', 'Leido', 'Respondido');
ALTER TABLE "public"."Mensaje" ALTER COLUMN "estado" TYPE "public"."EstadoMensaje_new" USING ("estado"::text::"public"."EstadoMensaje_new");
ALTER TYPE "public"."EstadoMensaje" RENAME TO "EstadoMensaje_old";
ALTER TYPE "public"."EstadoMensaje_new" RENAME TO "EstadoMensaje";
DROP TYPE "public"."EstadoMensaje_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."TipoUsuario_new" AS ENUM ('Particular', 'Agente');
ALTER TABLE "public"."Usuario" ALTER COLUMN "tipo_usuario" TYPE "public"."TipoUsuario_new" USING ("tipo_usuario"::text::"public"."TipoUsuario_new");
ALTER TYPE "public"."TipoUsuario" RENAME TO "TipoUsuario_old";
ALTER TYPE "public"."TipoUsuario_new" RENAME TO "TipoUsuario";
DROP TYPE "public"."TipoUsuario_old";
COMMIT;

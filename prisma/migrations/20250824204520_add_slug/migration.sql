/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Propiedad` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Made the column `area` on table `Propiedad` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Propiedad" ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "area" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Propiedad_slug_key" ON "public"."Propiedad"("slug");

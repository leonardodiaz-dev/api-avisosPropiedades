import { prisma } from "../lib/prisma";

export const guardarImagenes = async (
  files: Express.Multer.File[] | undefined,
  propiedadId: number
) => {
  if (!files || files.length === 0) return;

  await prisma.imagen.createMany({
    data: files.map((file) => ({
      url: `/uploads/${file.filename}`,
      propiedadId,
    })),
  });
};

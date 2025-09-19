import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import fs from "fs";
import path from "path";

export const uploadImagen = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const { propiedadId } = req.body;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No se subieron imágenes" });
    }

    const nuevasImagenes = await prisma.imagen.createMany({
      data: files.map(file => ({
        url: `/uploads/${file.filename}`,
        propiedadId: Number(propiedadId),
      })),
    });

    res.json({ message: "Imágenes subidas correctamente", nuevasImagenes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al subir imágenes" });
  }
};
export const eliminarImagenes = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Debe enviar un array de ids" });
    }

    const imagenes = await prisma.imagen.findMany({
      where: { id_imagen: { in: ids.map(Number) } },
    });

    if (imagenes.length === 0) {
      return res.status(404).json({ message: "No se encontraron imágenes" });
    }

    const eliminadas = await prisma.imagen.deleteMany({
      where: { id_imagen: { in: ids.map(Number) } },
    });

    imagenes.forEach((img) => {
      const filePath = path.join(__dirname, "../../uploads", path.basename(img.url));
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) console.error(`Error al eliminar archivo ${filePath}:`, err);
        });
      }
    });

    res.json({
      message: "Imágenes eliminadas correctamente",
      eliminadas: eliminadas.count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar imágenes" });
  }
};
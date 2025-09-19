import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const toggleFavorito = async (req: Request, res: Response) => {
  try {
    const { usuarioId, propiedadId } = req.body;

    const favorito = await prisma.favorito.findFirst({
      where: {
        usuarioId: Number(usuarioId),
        propiedadId: Number(propiedadId),
      },
    });

    if (favorito) {
      await prisma.favorito.delete({
        where: { id_favorito: favorito.id_favorito },
      });

      return res.json({ message: "Favorito eliminado", isFavorito: false });
    }

    const newFavorito = await prisma.favorito.create({
      data: {
        usuarioId: Number(usuarioId),
        propiedadId: Number(propiedadId),
      },
    });

    return res.json({ message: "Favorito agregado", isFavorito: true, favorito: newFavorito });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const listarFavoritos = async (req: Request, res: Response) => {

  try {
    const { id } = req.params

    const favoritos = await prisma.favorito.findMany({
      where: {
        usuarioId: Number(id)
      }
    })
    return res.json(favoritos)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const listarPropiedadesFavoritas = async (req: Request, res: Response) => {

  try {
    const { id } = req.params
    const { page = "1", limit = "5" } = req.query

    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const skip = (pageNumber - 1) * pageSize;

    const favoritos = await prisma.favorito.findMany({
      where: {
        usuarioId: Number(id)
      }
    })

    const arrayIdPropiedades = favoritos.map(f => f.propiedadId)

    const where: any = {
      id_propiedad: { in: arrayIdPropiedades }
    }

    const propiedades = await prisma.propiedad.findMany({
      where,
      include: {
        imagenes: true,
        distrito: { include: { provincia: true } }
      }, orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    })

    const total = await prisma.propiedad.count({ where })

    return res.json({
      total,
      page: pageNumber,
      limit: pageSize,
      totalPages: Math.ceil(total / pageSize),
      data: propiedades,
    })

  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
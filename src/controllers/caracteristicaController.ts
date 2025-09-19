import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const createCaracteristica = async (req: Request, res: Response) => {

    const { nombre } = req.body

    try {
        const newCaracteristica = await prisma.caracteristica.create({
            data: {
                nombre
            }
        })
        return res.json(newCaracteristica)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const getAllCaracteristicas = async (req: Request, res: Response) => {
    try {
        const caracteristicas = await prisma.caracteristica.findMany()
        return res.json(caracteristicas)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const asignarCaracteristica = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { caracteristicas } = req.body;

    const caracteristicasIds: number[] = (caracteristicas || []).map((c: any) => Number(c));

    const caracteristicasExistentes = await prisma.caracteristicaPropiedad.findMany({
      where: {
        propiedadId: Number(id),
      },
      select: {
        caracteristicaId: true,
      },
    });

    const idsExistentes = caracteristicasExistentes.map(c => c.caracteristicaId);

    const caracteristicasEliminar = idsExistentes.filter(
      c => !caracteristicasIds.includes(c)
    );

    const caracteristicasAgregar = caracteristicasIds.filter(
      c => !idsExistentes.includes(c)
    );

    if (caracteristicasAgregar.length > 0) {
      await prisma.caracteristicaPropiedad.createMany({
        data: caracteristicasAgregar.map(id_caracteristica => ({
          propiedadId: Number(id),
          caracteristicaId: id_caracteristica,
        })),
        skipDuplicates: true,
      });
    }

    if (caracteristicasEliminar.length > 0) {
      await prisma.caracteristicaPropiedad.deleteMany({
        where: {
          propiedadId: Number(id),
          caracteristicaId: { in: caracteristicasEliminar },
        },
      });
    }

    res.json({
      message: "Características asignadas",
      agregadas: caracteristicasAgregar,
      eliminadas: caracteristicasEliminar,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

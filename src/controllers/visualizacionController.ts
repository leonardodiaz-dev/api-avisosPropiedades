import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const createVisualizacion = async (req: Request, res: Response) => {
    try {
        const { propiedadId } = req.body
        if (!propiedadId) {
            return res.status(404).json(
                { message: "No se ha proporcionado el id de la propiedad" })
        }
        const newVisualizacion = await prisma.visualizacion.create({
            data: {
                propiedadId: Number(propiedadId)
            }
        })
        return res.json(newVisualizacion)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const contarVisualizaciones = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const visualizaciones = await prisma.visualizacion.count({
            where: {
                propiedadId: Number(id)
            }
        })
        return res.json({ count: visualizaciones })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
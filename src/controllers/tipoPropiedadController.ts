import { prisma } from "../lib/prisma";
import { Request, Response } from 'express'

export const getAllTipoPropiedad = async (req: Request, res: Response) => {
    try {

        const tipoPropiedad = await prisma.tipo_Propiedad.findMany()
        return res.json(tipoPropiedad)
        
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const createTipoPropiedad = async (req: Request, res: Response) => {
    try {
        const { nombre } = req.body

        const newTipoPropiedad = await prisma.tipo_Propiedad.create({
            data: {
                nombre
            }
        })
        return res.json(newTipoPropiedad)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
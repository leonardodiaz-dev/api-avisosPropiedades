import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const getProvinciasByDepartamento = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const provincias = await prisma.provincia.findMany({
            where: {
                departamentoId: Number(id)
            }
        })
        return res.json(provincias)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const getAllDepartamentos = async (req: Request, res: Response) => {
    try {

        const departamentos = await prisma.departamento.findMany()
        return res.status(201).json(departamentos)

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const getDistritosByProvincia = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const distritos = await prisma.distrito.findMany({
            where: {
                provinciaId: Number(id)
            }
        })
        return res.json(distritos)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const buscar = async (req: Request, res: Response) => {
    const { q } = req.query;

    if (!q || typeof q !== "string" || q.length < 1) {
        return res.json([]);
    }

    try {
        const query = q as string;

        const departamentos = await prisma.departamento.findMany({
            where: {
                nombre: { contains: query, mode: "insensitive" },
            },
            take: 5,
        });

        const provincias = await prisma.provincia.findMany({
            where: {
                nombre: { contains: query, mode: "insensitive" },
            },
            include: { departamento: true },
            take: 5,
        });

        const distritos = await prisma.distrito.findMany({
            where: {
                nombre: { contains: query, mode: "insensitive" },
            },
            include: {
                provincia: { include: { departamento: true } },
            },
            take: 5,
        });

        const formatted = [
            ...departamentos.map((d) => ({
                id: `dep-${d.id_departamento}`,
                label: d.nombre,
                tipo: "departamento",
            })),
            ...provincias.map((p) => ({
                id: `prov-${p.id_provincia}`,
                label: `${p.nombre}, ${p.departamento.nombre}`,
                tipo: "provincia",
            })),
            ...distritos.map((d) => ({
                id: `dist-${d.id_distrito}`,
                label: `${d.nombre}, ${d.provincia.nombre}, ${d.provincia.departamento.nombre}`,
                tipo: "distrito",
            })),
        ];

        res.json(formatted);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en búsqueda" });
    }
};

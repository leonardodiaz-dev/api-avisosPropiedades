import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const createMensaje = async (req: Request, res: Response) => {
    try {
        const { mensaje, remitenteId, destinatarioId, propiedadId, contacto } = req.body;

        let contactoId: number | undefined;

        if (!remitenteId && contacto) {
            const newContacto = await prisma.contacto.create({
                data: {
                    nombre: contacto.nombre,
                    dni: contacto.dni,
                    email: contacto.email,
                    telefono: contacto.telefono,
                },
            });
            contactoId = newContacto.id_contacto;
        }

        const nuevoMensaje = await prisma.mensaje.create({
            data: {
                mensaje,
                remitenteId: remitenteId || null,
                contactoId: contactoId || null,
                destinatarioId,
                propiedadId,
            },
            include: {
                remitente: true,
                contacto: true,
                destinatario: true,
            },
        });

        res.json(nuevoMensaje);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error al enviar mensaje" });
    }
}

export const listarMensajesByUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { page = "1", limit = "10", estado } = req.query;

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    try {
        const where: any = { destinatarioId: Number(id) };

        if (estado !== undefined) {
            where.estado = estado === "true";
        }

        const [mensajes, total] = await Promise.all([
            prisma.mensaje.findMany({
                where,
                skip: (pageNumber - 1) * pageSize,
                take: pageSize,
                orderBy: { id_mensaje: "desc" },
                include: { remitente: true, contacto: true }
            }),
            prisma.mensaje.count({ where })
        ]);

        return res.json({
            mensajes,
            total,
            page: pageNumber,
            totalPages: Math.ceil(total / pageSize)
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const actualizarEstadoMensajes = async (req: Request, res: Response) => {

    try {
        const { ids, estado } = req.body;

        const result = await prisma.mensaje.updateMany({
            where: { id_mensaje: { in: ids } },
            data: { estado }
        });
        return res.json({ count: result.count, estado });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};


export const actualizarEstadoLeido = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await prisma.mensaje.update({
            where: {
                id_mensaje: Number(id)
            }, data: {
                isLeido: true
            }
        })
        return res.json({ message: "El mensaje se actualizo con exito" })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}


export const getMensajeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const mensaje = await prisma.mensaje.findUnique({
            where: {
                id_mensaje: Number(id)
            }, include: {
                remitente: true,
                contacto: true,
                propiedad: { select: { titulo: true, usuarioId: true, slug: true } }
            }
        })
        return res.json(mensaje)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const eliminarDefinitivamenteMensajes = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body
        console.log(ids)
        await prisma.mensaje.deleteMany({
            where: {
                id_mensaje: { in: ids }
            }
        })
        return res.json({ message: "Mensajes eliminados definitivamente" })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const propiedadesInteresadasByUsuarioId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { page = "1", limit = "5" } = req.query;

        const pageNumber = Number(page);
        const pageSize = Number(limit);
        const skip = (pageNumber - 1) * pageSize;

        const propiedadesIds = await prisma.mensaje.findMany({
            where: { remitenteId: Number(id) },
            distinct: ["propiedadId"],
            select: { propiedadId: true },
        });

        const total = propiedadesIds.length; 

        const paginatedIds = propiedadesIds
            .slice(skip, skip + pageSize)
            .map((p) => p.propiedadId);

        const propiedades = await prisma.propiedad.findMany({
            where: { id_propiedad: { in: paginatedIds } },
            include: {
                imagenes: true,
                distrito: { include: { provincia: true } },
            },
            orderBy: { createdAt: "desc" },
        });

        return res.json({
            total,
            page: pageNumber,
            limit: pageSize,
            totalPages: Math.ceil(total / pageSize),
            data: propiedades,
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

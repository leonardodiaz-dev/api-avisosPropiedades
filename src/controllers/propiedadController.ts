import { prisma } from "../lib/prisma";
import { Request, Response } from "express";
import slugify from "slugify";
import { TipoMoneda, TipoOperacion } from "@prisma/client";
import fs from "fs";
import path from "path";
import { guardarImagenes } from "../utils/imagenHelper";

export const createPropiedad = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const files = req.files as Express.Multer.File[];

    const propiedad = await prisma.propiedad.create({
      data: {
        titulo: body.titulo,
        descripcion: body.descripcion,
        precio: Number(body.precio),
        direccion: body.direccion,
        area_total: Number(body.area_total),
        area_construida: Number(body.area_construida),
        antiguedad: body.antiguedad ? Number(body.antiguedad) : null,
        dormitorios: body.dormitorios ? Number(body.dormitorios) : null,
        banos: body.banos ? Number(body.banos) : null,
        tipo_operacion: body.tipo_operacion as TipoOperacion,
        tipo_moneda: body.tipo_moneda as TipoMoneda,
        usuarioId: Number(body.usuarioId),
        tipoPropiedadId: Number(body.tipoPropiedadId),
        distritoId: Number(body.distritoId),
      },
    });

    const slug = `${slugify(propiedad.titulo, { lower: true, strict: true })}-${propiedad.id_propiedad}`;

    await prisma.propiedad.update({
      where: { id_propiedad: propiedad.id_propiedad },
      data: { slug },
    });

    await guardarImagenes(files, propiedad.id_propiedad);

    const propiedadConImagenes = await prisma.propiedad.findUnique({
      where: { id_propiedad: propiedad.id_propiedad },
      include: { imagenes: true },
    });

    return res.status(201).json(propiedadConImagenes);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const editPropiedad = async (req: Request, res: Response) => {
  try {

    const { id } = req.params
    const body = req.body
    const files = req.files as Express.Multer.File[];

    if (!id) {
      return res.status(400).json({
        error: "El parametro id es obligatorio"
      })
    }

    const updatePropiedad = await prisma.propiedad.update({
      where: {
        id_propiedad: Number(id)
      },
      data: {
        titulo: body.titulo,
        descripcion: body.descripcion,
        precio: Number(body.precio),
        direccion: body.direccion,
        area_total: Number(body.area_total),
        area_construida: Number(body.area_construida),
        antiguedad: body.antiguedad ? Number(body.antiguedad) : null,
        dormitorios: body.dormitorios ? Number(body.dormitorios) : null,
        banos: body.banos ? Number(body.banos) : null,
        tipo_operacion: body.tipo_operacion as TipoOperacion,
        tipo_moneda: body.tipo_moneda as TipoMoneda,
        tipoPropiedadId: Number(body.tipoPropiedadId),
        distritoId: Number(body.distritoId),
      }
    })

    if (body.imagenesEliminar) {
      const imagenesEliminar = JSON.parse(body.imagenesEliminar) as number[];

      if (Array.isArray(imagenesEliminar) && imagenesEliminar.length > 0) {

        const imgs = await prisma.imagen.findMany({
          where: {
            id_imagen: { in: imagenesEliminar },
            propiedadId: updatePropiedad.id_propiedad,
          },
        });

        await prisma.imagen.deleteMany({
          where: {
            id_imagen: { in: imagenesEliminar },
            propiedadId: updatePropiedad.id_propiedad,
          },
        });

        imgs.forEach((img) => {
          const filePath = path.join(__dirname, "..", "uploads", path.basename(img.url));
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Error eliminando archivo:", err);
            } else {
              console.log("Archivo eliminado:", filePath);
            }
          });
        });
      }
    }

    await guardarImagenes(files, updatePropiedad.id_propiedad);

    const propiedadConImagenes = await prisma.propiedad.findUnique({
      where: { id_propiedad: updatePropiedad.id_propiedad },
      include: { imagenes: true },
    });

    return res.status(201).json(propiedadConImagenes);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}


export const getPropiedadBySlug = async (req: Request, res: Response) => {

  try {
    const { slug } = req.params

    if (!slug) {
      return res.status(400).json({
        error: "El parámetro 'slug' es obligatorio"
      });
    }
    const propiedad = await prisma.propiedad.findUnique({
      where: { slug },
      include: {
        imagenes: true,
        distrito: true,
        tipoPropiedad: true,
        CaracteristicaPropiedad: {
          include: { caracteristica: true }
        }
      }
    })

    if (propiedad) {
      const { CaracteristicaPropiedad, ...resto } = propiedad;
      const resultado = {
        ...resto,
        caracteristicas: CaracteristicaPropiedad.map(c => ({
          id_caracteristica: c.caracteristica.id_caracteristica,
          nombre: c.caracteristica.nombre
        }))
      }
      return res.json(resultado);
    } else
      return res.status(400).json({ error: "No se encontro la propiedad" })

  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const getPropiedadById = async (req: Request, res: Response) => {

  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        error: "El parámetro 'slug' es obligatorio"
      });
    }
    const propiedad = await prisma.propiedad.findUnique({
      where: { id_propiedad: Number(id) },
      include: {
        imagenes: true,
        distrito: {
          include: {
            provincia: {
              include: {
                departamento: true
              }
            }
          }
        },
        tipoPropiedad: true,
        CaracteristicaPropiedad: {
          include: { caracteristica: true }
        }
      }
    })

    if (propiedad) {
      const { CaracteristicaPropiedad, ...resto } = propiedad;
      const resultado = {
        ...resto,
        caracteristicas: CaracteristicaPropiedad.map(c => ({
          id_caracteristica: c.caracteristica.id_caracteristica,
          nombre: c.caracteristica.nombre
        })),
        departamentoId: propiedad.distrito.provincia.departamento.id_departamento,
        provinciaId: propiedad.distrito.provincia.id_provincia,
      }
      return res.json(resultado);
    } else
      return res.status(400).json({ error: "No se encontro la propiedad" })

  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
export const getAllPropiedades = async (req: Request, res: Response) => {
  try {
    const {
      precioMin,
      precioMax,
      minDorm,
      maxDorm,
      ubicacionId,
      tipoMoneda,
      tipos_propiedades,
      tipo_operacion,
      page = "1",
      limit = "10"
    } = req.query;

    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const skip = (pageNumber - 1) * pageSize;

    const operacionNormalizada = tipo_operacion
      ? String(tipo_operacion).charAt(0).toUpperCase() + String(tipo_operacion).slice(1).toLowerCase()
      : undefined;

    const tiposArray = tipos_propiedades
      ? String(tipos_propiedades).split(",")
      : undefined;

    let ubicacionFilter: any = {};
    if (ubicacionId && typeof ubicacionId === "string") {
      const [tipo, rawId] = ubicacionId.split("-");
      const id = Number(rawId);

      if (tipo === "dist") {
        ubicacionFilter = { distritoId: id };
      } else if (tipo === "prov") {
        ubicacionFilter = { distrito: { provinciaId: id } };
      } else if (tipo === "dep") {
        ubicacionFilter = {
          distrito: { provincia: { departamentoId: id } },
        };
      }
    }

    const where: any = {
      AND: [
        tiposArray ? { tipoPropiedad: { nombre: { in: tiposArray } } } : {},
        minDorm && minDorm !== "null" ? { dormitorios: { gte: Number(minDorm) } } : {},
        maxDorm && maxDorm !== "null" ? { dormitorios: { lte: Number(maxDorm) } } : {},
        precioMin && precioMin !== "null" ? { precio: { gte: Number(precioMin) } } : {},
        precioMax && precioMax !== "null" ? { precio: { lte: Number(precioMax) } } : {},
        tipoMoneda && tipoMoneda !== "null" ? { tipo_moneda: tipoMoneda as TipoMoneda } : {},
        ubicacionFilter,
        tipo_operacion ? { tipo_operacion: operacionNormalizada as TipoOperacion } : {},
      ],
    };

    const total = await prisma.propiedad.count({ where });

    const propiedades = await prisma.propiedad.findMany({
      where,
      include: {
        usuario: true,
        distrito: {
          include: {
            provincia: true
          }
        },
        tipoPropiedad: true,
        imagenes: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
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

export const getPropiedadesByUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const { page = "1", limit = "5", status = false, search } = req.query

    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const skip = (pageNumber - 1) * pageSize;

    const where: any = {
      usuarioId: Number(id),
      archivado: status === "archivado",
      ...(search
        ? {
          OR: [
            { id_propiedad: !isNaN(Number(search)) ? Number(search) : undefined },
            { titulo: { contains: String(search), mode: "insensitive" } },
            { direccion: { contains: String(search), mode: "insensitive" } },
          ].filter(Boolean),
        }
        : {}),
    };

    const propiedades = await prisma.propiedad.findMany({
      where,
      include: {
        tipoPropiedad: true,
        imagenes: true
      },
      orderBy: { createdAt: "desc" },
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

export const updateEstadoArchivarPropiedades = async (req: Request, res: Response) => {
  try {
    const { ids, status } = req.body

    const propiedades = await prisma.propiedad.updateMany({
      where: {
        id_propiedad: { in: ids }
      },
      data: {
        archivado: status
      }
    })
    return res.json(propiedades)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const propiedadesRecomendadas = async (req: Request, res: Response) => {
  try {

    const propiedades = await prisma.propiedad.findMany({
      take: 50,
      orderBy: { id_propiedad: "desc" },
      include:{
        imagenes:true
      }
    });

    const mezcladas = propiedades
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    res.json(mezcladas);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

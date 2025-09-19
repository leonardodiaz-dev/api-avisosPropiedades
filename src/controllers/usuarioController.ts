import { prisma } from "../lib/prisma";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { TipoUsuario } from "@prisma/client";

export const createUser = async (req: Request, res: Response) => {

  const { nombre, apellidos, email, dni, celular, tipo_usuario, contrasena } = req.body

  try {

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const newUser = await prisma.usuario.create({
      data: {
        nombre,
        apellidos,
        email,
        dni,
        celular,
        tipo_usuario: tipo_usuario as TipoUsuario,
        contrasena: hashedPassword,
      },
    });

    const user = {
      nombre: newUser.nombre,
      apellidos: newUser.apellidos,
      email: newUser.email,
      dni: newUser.dni,
      celular: newUser.celular,
      tipo_usuario: newUser.tipo_usuario,
      contrasena
    }

    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const cambiarContrasena = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { contrasena_actual, nueva_contrasena } = req.body

    if (!id || !contrasena_actual || !nueva_contrasena) {
      return res.status(404).json({ message: "Todos los campos son obligatorios" });
    }

    const usuario = await prisma.usuario.findUnique({
      where: {
        id_usuario: parseInt(id)

      },
    });

    if (!usuario) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    const isMatch = await bcrypt.compare(contrasena_actual, usuario.contrasena);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña actual incorrecta" });
    }

    const hashedPassword = await bcrypt.hash(nueva_contrasena, 10);

    await prisma.usuario.update({
      where: { id_usuario: parseInt(id) },
      data: {
        contrasena: hashedPassword,
      },
    });

    return res.json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const editarDatos = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { nombre, apellidos, email, dni, celular } = req.body

    if (!id) {
      return res.status(404).json({ message: "No se ha proporcionado el id" })
    }
    const datosEditados = await prisma.usuario.update({
      where: {
        id_usuario: Number(id)
      },
      data: {
        nombre,
        apellidos,
        dni,
        email,
        celular
      }
    })
    return res.json({
      id_usuario: datosEditados.id_usuario,
      nombre: datosEditados.nombre,
      apellidos: datosEditados.apellidos,
      dni: datosEditados.dni,
      celular: datosEditados.celular,
      email: datosEditados.email,
    })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const getAllUsuarios = async (req: Request, res: Response) => {
  try {

    const usuarios = await prisma.usuario.findMany()
    return res.json(usuarios)

  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
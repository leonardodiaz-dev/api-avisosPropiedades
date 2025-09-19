import express from 'express'
import { actualizarEstadoLeido, actualizarEstadoMensajes, createMensaje, eliminarDefinitivamenteMensajes, getMensajeById, listarMensajesByUsuario, propiedadesInteresadasByUsuarioId } from '../controllers/mensajeController'
import { authMiddleware } from '../middlewares/auth'

export const mensajeRouter = express.Router()

mensajeRouter.get("/mensajes/:id",authMiddleware,getMensajeById)
mensajeRouter.get("/mensajes/propiedades-interesado/:id",authMiddleware,propiedadesInteresadasByUsuarioId)
mensajeRouter.patch("/mensajes/actualizar-estado/:id",authMiddleware,actualizarEstadoLeido)
mensajeRouter.get("/mensajes/listar-by-usuario/:id",authMiddleware,listarMensajesByUsuario)
mensajeRouter.patch("/mensajes",authMiddleware,actualizarEstadoMensajes)
mensajeRouter.delete("/mensajes",authMiddleware,eliminarDefinitivamenteMensajes)
mensajeRouter.post("/mensajes",createMensaje)

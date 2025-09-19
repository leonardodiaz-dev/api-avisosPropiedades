import express from 'express'
import { createPropiedad, editPropiedad, getAllPropiedades, getPropiedadById, getPropiedadBySlug, getPropiedadesByUsuario, propiedadesRecomendadas, updateEstadoArchivarPropiedades } from '../controllers/propiedadController'
import { authMiddleware } from '../middlewares/auth';
import { upload } from '../middlewares/upload';

export const propiedadRouter = express.Router()

propiedadRouter.get('/propiedades/by-id/:id', getPropiedadById)
propiedadRouter.get("/propiedades/recomendadas",propiedadesRecomendadas)
propiedadRouter.get('/propiedades/by-slug/:slug', getPropiedadBySlug)
propiedadRouter.get("/propiedades/listar-by-user/:id", authMiddleware, getPropiedadesByUsuario)
propiedadRouter.get('/propiedades', getAllPropiedades)
propiedadRouter.put("/propiedades/:id", authMiddleware, upload.array("imagenes", 10), editPropiedad)
propiedadRouter.patch('/propiedades/archivar', authMiddleware, updateEstadoArchivarPropiedades)
propiedadRouter.post("/propiedades", authMiddleware, upload.array("imagenes", 10), createPropiedad);
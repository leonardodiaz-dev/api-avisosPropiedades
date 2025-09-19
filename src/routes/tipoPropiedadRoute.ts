import express from 'express'
import { createTipoPropiedad, getAllTipoPropiedad } from '../controllers/tipoPropiedadController'

export const tipoPropiedadRouter = express.Router()

tipoPropiedadRouter.get("/tipo-propiedades/listar",getAllTipoPropiedad)
tipoPropiedadRouter.post("/tipo-propiedades/create",createTipoPropiedad)
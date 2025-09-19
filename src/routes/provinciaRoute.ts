import express from 'express'
import { getProvinciasByDepartamento } from '../controllers/provinciaController'

export const provinciaRouter = express.Router()

provinciaRouter.get('/provincias/:id',getProvinciasByDepartamento)
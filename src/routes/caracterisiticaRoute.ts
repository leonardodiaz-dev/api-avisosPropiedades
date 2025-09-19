import express from 'express'
import { asignarCaracteristica, createCaracteristica, getAllCaracteristicas } from '../controllers/caracteristicaController'

export const caracteristicaRouter = express.Router()

caracteristicaRouter.get('/caracteristicas/listar',getAllCaracteristicas)
caracteristicaRouter.post('/caracteristicas/create',createCaracteristica)
caracteristicaRouter.post('/caracteristicas/:id/asignar',asignarCaracteristica)

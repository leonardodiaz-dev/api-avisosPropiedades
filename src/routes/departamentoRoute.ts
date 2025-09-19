import express from 'express'
import { getAllDepartamentos } from '../controllers/departamentoController'

export const departamentoRouter = express.Router()

departamentoRouter.get('/departamentos/listar',getAllDepartamentos)
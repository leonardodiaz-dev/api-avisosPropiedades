import express from 'express'
import { contarVisualizaciones, createVisualizacion } from '../controllers/visualizacionController'
import { authMiddleware } from '../middlewares/auth'

export const visualizacionRouter = express.Router()

visualizacionRouter.get("/visualizaciones/:id",authMiddleware,contarVisualizaciones)
visualizacionRouter.post("/visualizaciones",createVisualizacion)

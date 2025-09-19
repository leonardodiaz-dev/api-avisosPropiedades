import express from 'express'
import { listarFavoritos, listarPropiedadesFavoritas, toggleFavorito } from '../controllers/favoritoController'
import { authMiddleware } from '../middlewares/auth'

export const favoritoRouter = express.Router()

favoritoRouter.get("/favoritos/listar-propiedades/:id",authMiddleware,listarPropiedadesFavoritas)
favoritoRouter.get("/favoritos/:id",listarFavoritos)
favoritoRouter.post("/favoritos",authMiddleware,toggleFavorito)

import express from 'express'
import { cambiarContrasena, createUser, editarDatos, getAllUsuarios } from '../controllers/usuarioController'
import { loginUser } from '../controllers/authController'
import { authMiddleware } from '../middlewares/auth'
import { usuarioValidation } from '../validators/usuarioValidator'
import { validate } from '../middlewares/validate'

export const usuarioRouter = express.Router()

usuarioRouter.get('/usuarios',getAllUsuarios)
usuarioRouter.put('/usuarios/:id',authMiddleware,editarDatos)
usuarioRouter.patch("/usuarios/cambiar-contrasena/:id",authMiddleware,cambiarContrasena)
usuarioRouter.post('/usuarios/register',usuarioValidation,validate,createUser)
usuarioRouter.post('/usuarios/login',loginUser)

usuarioRouter.get("/usuarios/perfil", authMiddleware, (req, res) => {
  res.json({ message: "Accediste al perfil", user: (req as any).user });
});